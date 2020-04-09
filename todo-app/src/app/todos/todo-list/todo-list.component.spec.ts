import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TodoListComponent } from "./todo-list.component";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TodoListService } from "../../services/todo-list-service/todo-list.service";

describe("TodoComponent", () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      imports: [HttpClientModule],
      providers: [HttpClient]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
