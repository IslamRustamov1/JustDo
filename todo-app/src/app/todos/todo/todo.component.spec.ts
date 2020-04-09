import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Apollo } from "apollo-angular";

import { GraphQLModule } from "../../graphql.module";
import { TodoComponent } from "./todo.component";

import { TodoListService } from "../../services/todo-list-service/todo-list.service";
import { ITodo } from "src/app/interfaces";

describe("TodoComponent", () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoComponent],
      imports: [GraphQLModule],
      providers: [TodoComponent, TodoListService, Apollo],
    }).compileComponents();

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

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    component.todo = todo;

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
