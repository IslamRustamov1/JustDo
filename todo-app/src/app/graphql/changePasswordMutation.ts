import gql from "graphql-tag";

export const changePassword = gql`
  mutation changePassword($previousPassword: String!, $newPassword: String!) {
    changePassword(
      previousPassword: $previousPassword
      newPassword: $newPassword
    ) {
      message
    }
  }
`;

export interface IChangePassword {
  changePassword: {
    message: string;
  };
}
