import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { HttpClient, HttpHandler } from "@angular/common/http";

import { AlarmComponent } from "./alarm.component";
import { ITodo } from "../../interfaces";
import { Apollo } from "apollo-angular";

describe("AlarmComponent", () => {
  let component: AlarmComponent;
  let fixture: ComponentFixture<AlarmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlarmComponent],
      providers: [NgbActiveModal, HttpClient, HttpHandler, Apollo],
    }).compileComponents();
  }));

  beforeEach(() => {
    const todo: ITodo = {
      _id: "123",
      title: "string",
      description: "string",
      completed: false,
      date: "2012-02-02",
      time: 5,
      alarm: 5,
      urgency: "neutral",
    };

    fixture = TestBed.createComponent(AlarmComponent);
    component = fixture.componentInstance;
    component.todo = todo;

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
