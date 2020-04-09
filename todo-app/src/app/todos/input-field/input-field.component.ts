import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { Component, Output, EventEmitter, OnInit } from "@angular/core";

import { ITodo, IUrgency } from "../../interfaces";
import { defaultTodo } from "../../constants";
import { TodoListService } from "../../services/todo-list-service/todo-list.service";
import { FormatterService } from "src/app/services/formatter/formatter.service";
import { Subscription } from "rxjs";
import { UrgencyService } from "src/app/services/urgency/urgency.service";

@Component({
  selector: "app-input-field",
  templateUrl: "./input-field.component.html",
  styleUrls: ["./input-field.component.scss"],
})
export class InputFieldComponent implements OnInit {
  todo: ITodo;
  model: NgbDateStruct;
  time = { hour: 13, minute: 30 };
  urgencies: IUrgency[];
  subscription: Subscription;

  private alarm: number = 5;
  private urgency: string = "neutral";

  @Output() todoAdded: EventEmitter<ITodo> = new EventEmitter();
  @Output() completeAll: EventEmitter<ITodo> = new EventEmitter();

  constructor(
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

  setAlarm(value: number) {
    this.alarm = value;
  }

  setUrgency(value: string) {
    this.urgency = value;
  }

  onAddTodo(title) {
    if (title === "") return;

    this.todo = defaultTodo;
    this.todo.title = title;
    this.todo.time = this.time.hour * 60 + this.time.minute;

    if (this.model) {
      this.todo.date = this.formatterService.formatDate(
        this.model.year.toString() +
          "-" +
          this.model.month.toString() +
          "-" +
          (this.model.day + 1).toString()
      );
    } else {
      this.todo.date = this.formatterService.formatDate(
        new Date().getFullYear().toString() +
          "-" +
          (new Date().getMonth() + 1).toString() +
          "-" +
          (new Date().getDate() + 1).toString()
      );
    }

    if (this.alarm) this.todo.alarm = this.alarm;
    if (this.urgency) this.todo.urgency = this.urgency;

    this.todoListService.addTodo(this.todo);
  }
}
