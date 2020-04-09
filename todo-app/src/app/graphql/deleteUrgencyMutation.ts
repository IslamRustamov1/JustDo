import gql from "graphql-tag";

export const deleteUrgency = gql`
  mutation deleteUrgency($urgencyId: String!) {
    deleteUrgency(urgencyId: $urgencyId) {
      message
    }
  }
`;

export interface IDeleteUrgency {
  deleteUrgency: {
    message: string;
  };
}
