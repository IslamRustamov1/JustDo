import gql from "graphql-tag";

export const createTodo = gql`
  mutation createTodo(
    $title: String!
    $description: String
    $alarm: Int!
    $date: String!
    $time: Int!
    $urgency: String
    $completed: Boolean!
  ) {
    createTodo(
      title: $title
      description: $description
      alarm: $alarm
      date: $date
      time: $time
      urgency: $urgency
      completed: $completed
    ) {
      _id
      title
    }
  }
`;

export interface ICreateTodo {
  createTodo: {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    date: string;
    alarm: number;
    time: number;
    urgency: string;
  };
}
