import gql from "graphql-tag";

export const createUrgency = gql`
  mutation createUrgency($name: String!, $color: String!, $level: Int!) {
    createUrgency(name: $name, color: $color, level: $level) {
      _id
      name
      color
      level
    }
  }
`;

export interface ICreateUrgency {
  createUrgency: {
    _id: string;
    name: string;
    color: string;
    level: number;
  };
}
