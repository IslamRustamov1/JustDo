import gql from "graphql-tag";
import { ITodo } from "../interfaces";

export const getTodos = gql`
  query getTodos {
    getTodos {
      _id
      title
      description
      time
      date
      alarm
      urgency
      completed
    }
  }
`;

export interface IGetTodos {
  getTodos: ITodo[];
}
