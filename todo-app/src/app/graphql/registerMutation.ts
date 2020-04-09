import gql from "graphql-tag";

export const registerUser = gql`
  mutation registerUser($email: String!, $password: String!) {
    registerUser(email: $email, password: $password) {
      email
    }
  }
`;

export interface IRegisterUser {
  registerUser: {
    email: string;
  };
}
