import gql from "graphql-tag";

export const updateTodo = gql`
  mutation updateTodo(
    $todoId: String!
    $title: String!
    $description: String
    $alarm: Int!
    $date: String!
    $time: Int!
    $urgency: String
    $completed: Boolean!
  ) {
    updateTodo(
      todoId: $todoId
      title: $title
      description: $description
      alarm: $alarm
      date: $date
      time: $time
      urgency: $urgency
      completed: $completed
    ) {
      message
    }
  }
`;

export interface IUpdateTodo {
  updateTodo: {
    message: string;
  };
}
