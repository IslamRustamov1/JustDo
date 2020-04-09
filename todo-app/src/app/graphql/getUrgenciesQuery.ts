import gql from "graphql-tag";
import { IUrgency } from "../interfaces";

export const getUrgencies = gql`
  query getUrgencies {
    getUrgencies {
      _id
      name
      color
      level
    }
  }
`;

export interface IGetUrgencies {
  getUrgencies: IUrgency[];
}
