import gql from "graphql-tag";

export const resetPassword = gql`
  mutation resetPassword($password: String!, $resetPasswordCode: String!) {
    resetPassword(password: $password, resetPasswordCode: $resetPasswordCode) {
      message
    }
  }
`;

export interface IResetPassword {
  resetPassword: {
    message: string;
  };
}
