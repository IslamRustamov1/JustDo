import { Injectable, Input } from "@angular/core";
import { webSocket } from "rxjs/webSocket";
import { Observable, BehaviorSubject, from } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Apollo } from "apollo-angular";

import { ITodo, IFormattedTodos } from "../../interfaces";
import { AlarmComponent } from "../../helpers/alarm/alarm.component";
import { getTodos, IGetTodos } from "../../graphql/getTodosQuery";
import { deleteTodo, IDeleteTodo } from "../../graphql/deleteTodoMutation";
import { createTodo, ICreateTodo } from "../../graphql/createTodoMutation";
import { updateTodo, IUpdateTodo } from "../../graphql/updateTodoMutation";

@Injectable({
  providedIn: "root",
})
export class TodoListService {
  @Input() socketTodo: ITodo;

  private todos: ITodo[] = [];
  private filter: string = "all";

  private filterBehavior: BehaviorSubject<string> = new BehaviorSubject<string>(
    this.filter
  );
  private todosBehavior: BehaviorSubject<ITodo[]> = new BehaviorSubject<
    ITodo[]
  >(this.todos);

  filterBehavior$: Observable<string> = this.filterBehavior.asObservable();
  todosBehavior$: Observable<ITodo[]> = this.todosBehavior.asObservable();

  constructor(private modalService: NgbModal, private apollo: Apollo) {
    this.apollo
      .query<IGetTodos>({ query: getTodos })
      .subscribe((response) => {
        this.todos = response.data.getTodos;
        this.todosBehavior.next(this.todos);
      });
  }

  setFilter(value: string) {
    this.filter = value;
    this.filterBehavior.next(this.filter);
  }

  getFilteredTodos(type: string) {
    if (type === "all") {
      return this.todos;
    } else {
      return this.todos.filter(
        (todo) => todo.urgency.toLowerCase() === type.toLowerCase()
      );
    }
  }

  addTodo(todo: ITodo) {
    this.apollo
      .mutate<ICreateTodo>({
        mutation: createTodo,
        variables: {
          title: todo.title,
          description: todo.description,
          date: todo.date,
          time: todo.time,
          alarm: todo.alarm,
          urgency: todo.urgency,
          completed: todo.completed,
        },
      })
      .subscribe(
        (response) => {
          todo._id = response.data.createTodo._id;
          this.todos.push(todo);
          this.todosBehavior.next(this.todos);
          this.sendWebsocketRequest(todo);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  open(todo: ITodo) {
    const modalRef = this.modalService.open(AlarmComponent);
    modalRef.componentInstance.todo = todo;
  }

  sendWebsocketRequest(todo: ITodo) {
    const subject = webSocket("ws://mysterious-savannah-44011.herokuapp.com/");

    subject.subscribe(
      (todo) => {
        const parsedTodo = JSON.parse(JSON.stringify(todo));

        let alarm = new Audio();

        alarm.src = "../../../assets/when.mp3";
        alarm.load();
        alarm.play();

        console.log("message received: " + JSON.stringify(todo));

        this.open(this.todos.find((todo) => todo._id === parsedTodo._id));
        subject.complete();
      },
      (err) => {
        console.log(err);
        subject.complete();
      },
      () => console.log("Websocket is closed")
    );

    subject.next(todo);
  }

  editTodo(todo: ITodo) {
    if (todo.description === "") todo.description = "1";

    this.apollo
      .mutate<IUpdateTodo>({
        mutation: updateTodo,
        variables: {
          todoId: todo._id,
          title: todo.title,
          description: todo.description,
          urgency: todo.urgency,
          date: todo.date,
          time: todo.time,
          alarm: todo.alarm,
          completed: todo.completed,
        },
      })
      .subscribe(
        (response) => {
          this.todosBehavior.next(this.todos);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  completeTodo(todo: ITodo) {
    this.apollo
      .mutate<IUpdateTodo>({
        mutation: updateTodo,
        variables: {
          todoId: todo._id,
          title: todo.title,
          description: todo.description,
          urgency: todo.urgency,
          date: todo.date,
          time: todo.time,
          alarm: todo.alarm,
          completed: todo.completed,
        },
      })
      .subscribe(
        (response) => {
          this.todosBehavior.next(this.todos);
        },
        (error) => {
          console.log(error);
        }
      );

    this.todos.find((elem) => elem._id === todo._id).completed = todo.completed;
  }

  deleteTodo(todo: ITodo) {
    this.apollo
      .mutate<IDeleteTodo>({
        mutation: deleteTodo,
        variables: {
          todoId: todo._id,
        },
      })
      .subscribe(
        (response) => {
          console.log(response.data.deleteTodo.message);
          this.todos = this.todos.filter((elem) => elem._id !== todo._id);
          this.todosBehavior.next(this.todos);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
