import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Apollo } from "apollo-angular";
import { HttpClient, HttpClientModule } from "@angular/common/http";

import { InputFieldComponent } from "./input-field.component";
import { GraphQLModule } from "../../graphql.module";

describe("InputFieldComponent", () => {
  let component: InputFieldComponent;
  let fixture: ComponentFixture<InputFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputFieldComponent],
      imports: [HttpClientModule, GraphQLModule],
      providers: [HttpClient, Apollo],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
