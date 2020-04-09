import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, AfterViewInit, Input, OnInit } from "@angular/core";

import { AuthService } from "../../services/auth-service/auth.service";
import { TokenService } from "../../services/token-service/token.service";

import { validatePwds } from "../../validators/validators";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit, AfterViewInit {
  @Input() passwordType: string;
  @Input() confPasswordType: string;

  reactiveForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.passwordType = "password";
    this.confPasswordType = "password";
  }

  ngAfterViewInit(): void {
    this.tokenService.clearStorage();
  }

  initForm() {
    this.reactiveForm = this.fb.group({
      email: [null, [Validators.email]],
      password: [null],
      confPassword: [null],
    });
    this.reactiveForm.setValidators(validatePwds);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.reactiveForm.controls[controlName];

    const result = control.invalid && control.touched;

    return result;
  }

  toggleType(inputId: string) {
    switch (inputId) {
      case "password":
        if (this.passwordType === "password") {
          this.passwordType = "text";
        } else {
          this.passwordType = "password";
        }
        break;

      case "confPassword":
        if (this.confPasswordType === "password") {
          this.confPasswordType = "text";
        } else {
          this.confPasswordType = "password";
        }
        break;
      default:
        break;
    }
  }

  onSubmit(email: string, password: string, confPassword: string) {
    if (this.reactiveForm.status === "VALID") {
      this.authService.signup({ email, password });
    }
  }

  redirect() {
    this.router.navigate(["./login"]);
  }
}
