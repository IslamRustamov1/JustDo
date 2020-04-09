import { Subscription } from "rxjs";
import { Component, OnInit } from "@angular/core";
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from "@angular/animations";

import { IFormattedTodos, ITodo } from "../../interfaces";
import { TodoListService } from "../../services/todo-list-service/todo-list.service";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"],
  animations: [
    trigger("fade", [
      state(
        "closed",
        style({
          opacity: 1,
        })
      ),
      state(
        "open",
        style({
          opacity: 0,
        })
      ),
      transition("open => closed", [animate("1s")]),
      transition("closed => open", [animate("1s")]),
    ]),
  ],
})
export class TodoListComponent implements OnInit {
  formattedTodos: IFormattedTodos[] = [];
  todos: ITodo[] = [];
  filter: string = "all";
  todosSubscription: Subscription;
  filterSubscription: Subscription;

  constructor(private todoListService: TodoListService) {}

  ngOnInit() {
    this.filterSubscription = this.todoListService.filterBehavior$.subscribe(
      (filter) => {
        this.filter = filter;
        this.todosSubscription = this.todoListService.todosBehavior$.subscribe(
          (todos) => {
            if (this.filter !== "all") {
              this.todos = this.todoListService.getFilteredTodos(this.filter);
            } else {
              this.formattedTodos = this.getFormattedTodos(todos);
            }
          }
        );
      }
    );
  }

  getFormattedTodos(todos) {
    if (!todos) return;
    const formattedTodos: IFormattedTodos[] = Object.values(
      todos.reduce((result, todo) => {
        let isHidden = true;

        this.formattedTodos.forEach((todos) => {
          if (todos.date === todo.date) {
            isHidden = todos.hidden;
          }
        });
        // Create new group
        if (!result[todo.date])
          result[todo.date] = {
            date: todo.date,
            hidden: isHidden,
            todos: [],
          };

        // Append to group
        result[todo.date].todos.push(todo);
        return result;
      }, {})
    );

    formattedTodos.sort((todos1, todos2) => {
      const a = new Date(todos1.date);
      const b = new Date(todos2.date);
      return a > b ? 1 : -1;
    });

    formattedTodos.forEach((formattedTodo) => {
      formattedTodo.todos.sort((todo1, todo2) => {
        return todo1.time - todo2.time;
      });
    });

    return formattedTodos;
  }

  ngOnDestroy() {
    this.todosSubscription && this.todosSubscription.unsubscribe();
  }

  toggleTodoList(todosList: IFormattedTodos) {
    todosList.hidden = !todosList.hidden;
  }
}
