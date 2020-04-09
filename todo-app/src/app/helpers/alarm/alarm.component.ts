import { Component, Input, Output, EventEmitter } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";

import { TodoListService } from "../../services/todo-list-service/todo-list.service";
import { FormatterService } from "../../services/formatter/formatter.service";
import { ITodo, IUrgency } from "../../interfaces";
import { UrgencyService } from "src/app/services/urgency/urgency.service";

@Component({
  selector: "app-alarm",
  templateUrl: "./alarm.component.html",
  styleUrls: ["./alarm.component.scss"],
})
export class AlarmComponent {
  @Input() todo: ITodo;
  @Output() todoCompleted: EventEmitter<ITodo> = new EventEmitter();

  urgencies: IUrgency[];
  subscription: Subscription;

  constructor(
    public activeModal: NgbActiveModal,
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

  setAlarm(val: number) {
    this.todo.alarm = val;
    this.todoListService.sendWebsocketRequest(this.todo);
  }

  onCompleteTodo() {
    this.todo.completed = !this.todo.completed;
    this.todoListService.completeTodo(this.todo);
  }

  getTime() {
    return this.formatterService.formatTime(this.todo.time);
  }

  getUrgencyColor() {
    let color;
    this.urgencies.forEach((urgency: IUrgency) => {
      if (urgency.name.toLowerCase() === this.todo.urgency.toLowerCase())
        color = urgency.color;
    });
    return color;
  }
}
