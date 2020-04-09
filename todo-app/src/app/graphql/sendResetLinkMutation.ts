import gql from "graphql-tag";

export const sendResetLink = gql`
  mutation sendResetLink($email: String!) {
    sendResetLink(email: $email) {
      message
    }
  }
`;

export interface ISendResetLink {
  sendResetLink: {
    message: string;
  };
}
