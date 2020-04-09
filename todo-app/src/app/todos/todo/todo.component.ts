import { Component, Input, Output, EventEmitter } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";

import { ITodo, IUrgency } from "../../interfaces";
import { TodoListService } from "../../services/todo-list-service/todo-list.service";
import { FormatterService } from "src/app/services/formatter/formatter.service";
import { UrgencyService } from "src/app/services/urgency/urgency.service";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.scss"],
})
export class TodoComponent {
  @Input() todo: ITodo;
  @Output() todoCompleted: EventEmitter<ITodo> = new EventEmitter();
  @Output() todoDeleted: EventEmitter<ITodo> = new EventEmitter();

  editing: boolean = false;
  urgencies: IUrgency[];
  time = { hour: 13, minute: 30 };
  subscription: Subscription;

  constructor(
    private modalService: NgbModal,
    private todoListService: TodoListService,
    private formatterService: FormatterService,
    private urgencyService: UrgencyService
  ) {}

  ngOnInit(): void {
    this.subscription = this.urgencyService.urgenciesBehavior$.subscribe(
      (urgencies) => {
        this.urgencies = urgencies;
      }
    );
  }

  openModal(content) {
    this.modalService.open(content, { centered: true, size: "sm" });
  }

  getAlarm() {
    return this.formatterService.formatAlarm(this.todo.alarm);
  }

  setUrgency(urgency: string) {
    this.todo.urgency = urgency;

    this.todoListService.editTodo(this.todo);
  }

  setTime() {
    this.todo.time = this.time.hour * 60 + this.time.minute;

    this.todoListService.sendWebsocketRequest(this.todo);

    this.todoListService.editTodo(this.todo);
  }

  setAlarm(alarm: number) {
    this.todo.alarm = alarm;

    this.todoListService.sendWebsocketRequest(this.todo);

    this.todoListService.editTodo(this.todo);
  }

  getTime() {
    return this.formatterService.formatTime(this.todo.time);
  }

  getUrgencyColor() {
    let color = "#ff0000";
    this.urgencies.forEach((urgency: IUrgency) => {
      if (urgency.name.toLowerCase() === this.todo.urgency.toLowerCase())
        color = urgency.color;
    });
    return color;
  }

  onCompleteTodo() {
    this.todo.completed = !this.todo.completed;
    this.todoListService.completeTodo(this.todo);
  }

  onDeleteTodo() {
    this.todoListService.deleteTodo(this.todo);
  }

  onStartTitleEditing() {
    this.editing = true;
  }

  endTodoTitleEditing(title: string) {
    this.editing = false;
    if (title === "") return;
    this.todo.title = title;
    this.todoListService.editTodo(this.todo);
  }

  endTodoEditing(description: string) {
    this.todo.description = description;
    this.todoListService.editTodo(this.todo);
  }
}
