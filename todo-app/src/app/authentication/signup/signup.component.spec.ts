import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SignupComponent } from "./signup.component";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { Apollo } from "apollo-angular";

describe("SignupComponent", () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [HttpClient, FormBuilder, Apollo],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
