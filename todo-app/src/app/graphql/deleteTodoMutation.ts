import gql from "graphql-tag";

export const deleteTodo = gql`
  mutation deleteTodo($todoId: String!) {
    deleteTodo(todoId: $todoId) {
      message
    }
  }
`;

export interface IDeleteTodo {
  deleteTodo: {
    message: string;
  };
}
