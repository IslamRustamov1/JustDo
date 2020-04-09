import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClient, HttpHandler } from "@angular/common/http";

import { ResetPwdComponent } from "./reset-pwd.component";
import { Apollo } from "apollo-angular";

describe("ResetPwdComponent", () => {
  let component: ResetPwdComponent;
  let fixture: ComponentFixture<ResetPwdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ResetPwdComponent],
      providers: [FormBuilder, HttpClient, HttpHandler, Apollo],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
