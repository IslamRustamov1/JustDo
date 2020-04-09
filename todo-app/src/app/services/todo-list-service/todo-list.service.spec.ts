import { TestBed } from "@angular/core/testing";
import { Apollo } from "apollo-angular";
import { HttpClientModule } from "@angular/common/http";

import { TodoListService } from "./todo-list.service";

import { GraphQLModule } from "../../graphql.module";

describe("TodoListService", () => {
  let service: TodoListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, GraphQLModule],
      providers: [Apollo],
    });
    service = TestBed.inject(TodoListService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
