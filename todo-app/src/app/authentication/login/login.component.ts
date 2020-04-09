import { Router } from "@angular/router";
import { Component, AfterViewInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { validatePwds } from "../../validators/validators";
import { AuthService } from "../../services/auth-service/auth.service";
import { TokenService } from "../../services/token-service/token.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements AfterViewInit {
  formGr: FormGroup;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGr = this.fb.group(
      {
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required]],
        confPassword: [null, [Validators.required]],
      },
      { validator: validatePwds }
    );
  }

  ngAfterViewInit(): void {
    this.tokenService.clearStorage();
  }

  onSubmit(email: string, password: string) {
    this.authService.login({ email: email, password: password });
  }

  redirect() {
    this.router.navigate(["./signup"]);
  }
}
