import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FormsModule, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { ForgotPwdComponent } from "./forgot-pwd.component";
import { Apollo } from "apollo-angular";

describe("ForgotPwdComponent", () => {
  let component: ForgotPwdComponent;
  let fixture: ComponentFixture<ForgotPwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPwdComponent],
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule],
      providers: [FormBuilder, HttpClient, HttpHandler, Apollo],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
