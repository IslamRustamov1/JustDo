const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { UserInputError, AuthenticationError } = require('apollo-server');

const User = require('../models/userModel');

const { SECRET, NODEMAILER_EMAIL, NODEMAILER_PASSWORD } = require('../config');

const getToken = ({ id, email }) =>
  jwt.sign(
    {
      id,
      email,
    },
    SECRET,
    { expiresIn: '1d' }
  );

const getUser = async (authorization) => {
  if (!authorization) throw new AuthenticationError('You have to login first');

  const token = authorization.split('Bearer ')[1];
  if (!token) throw new AuthenticationError('No token provided');

  const user = await jwt.verify(token, SECRET, (err, decoded) => {
    if (err) throw new AuthenticationError('Invalid token');
    return decoded;
  });

  return user;
};

module.exports = {
  getToken,
  getUser,
  Mutation: {
    async loginUser(_, { email, password }) {
      if (email === '' || password === '') {
        throw new UserInputError('Empty email or password');
      }

      const user = await User.findOne({ email });
      if (!user)
        throw new AuthenticationError('User with this email doesnt exist');

      const match = await bcrypt.compare(password, user.password);

      if (!match) throw new AuthenticationError('Wrong password');

      const token = getToken(user);
      return {
        id: user._id,
        email: user.email,
        token,
      };
    },

    async registerUser(_, { email, password }) {
      if (email === '' || password === '') {
        throw new UserInputError('Empty email or password');
      }

      const user = await User.findOne({ email });
      if (user) throw new Error('User with this email already exists');

      password = await bcrypt.hash(password, 10);
      const newUser = new User({
        email,
        password,
      });

      const res = await newUser.save();
      const token = getToken(res);

      return {
        id: res._id,
        email: res.email,
        token,
      };
    },

    async sendResetLink(_, { email }) {
      if (email === '') {
        throw new UserInputError('Empty email');
      }

      const user = await User.findOne({ email });
      if (!user) throw new Error('User with this email doesnt exist');

      user.resetPasswordCode = crypto.randomBytes(10).toString('hex');
      await user.save();

      const transporter = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: NODEMAILER_EMAIL,
          pass: NODEMAILER_PASSWORD,
        },
      });

      const mailOptions = {
        from: NODEMAILER_EMAIL,
        to: email,
        subject: 'Reset password',
        html: `Hi, here is your <a href="http://localhost:4200/reset-password/${user.resetPasswordCode}"> reset password link </a>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) throw new Error('Error occured while sending mail');
      });

      return { message: 'Mail successfuly sent' };
    },

    async resetPassword(_, { password, resetPasswordCode }) {
      if (resetPasswordCode === '' || password === '') {
        throw new UserInputError('Empty code or new password');
      }

      const user = await User.findOne({ resetPasswordCode });
      if (!user) throw new Error('Incorrect reset password code');

      user.password = await bcrypt.hash(password, 10);
      user.resetPasswordCode = undefined;

      await user.save();

      return { message: 'Password successfuly reseted' };
    },

    async changePassword(
      _,
      { previousPassword, newPassword },
      { authorization }
    ) {
      const userToken = await getUser(authorization);

      if (userToken) {
        try {
          const userCollection = await User.findById(userToken.id);

          const passwordComparison = await bcrypt.compare(
            previousPassword,
            userCollection.password
          );

          if (passwordComparison) {
            userCollection.password = await bcrypt.hash(newPassword, 10);
            await userCollection.save();

            return { message: 'Password successfuly changed' };
          } else {
            throw new AuthenticationError('Incorrent previous password');
          }
        } catch (err) {
          throw new Error(err);
        }
      }
    },
  },
};
