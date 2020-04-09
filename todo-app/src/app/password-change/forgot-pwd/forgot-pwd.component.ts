import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { ResetPasswordService } from "../../services/reset-password/reset-password.service";

@Component({
  selector: "app-forgot-pwd",
  templateUrl: "./forgot-pwd.component.html",
  styleUrls: ["./forgot-pwd.component.scss"],
})
export class ForgotPwdComponent implements OnInit {
  reactiveForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private resetPasswordService: ResetPasswordService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.reactiveForm = this.fb.group({
      email: [null, [Validators.required]],
    });
  }

  onSubmit(mail: string) {
    this.resetPasswordService.sendResetLink(mail);
  }
}
