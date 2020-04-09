import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ResetPasswordService } from "../../services/reset-password/reset-password.service";
import { validatePwds } from "../../validators/validators";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent implements OnInit {
  @Input() passwordType: string;
  @Input() prevPasswordType: string;
  @Input() confPasswordType: string;

  reactiveForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private resetPasswordService: ResetPasswordService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.passwordType = "password";
    this.confPasswordType = "password";
    this.prevPasswordType = "password";
  }

  initForm() {
    this.reactiveForm = this.fb.group({
      prevPassword: [null],
      password: [null],
      confPassword: [null],
    });
    this.reactiveForm.setValidators(validatePwds);
  }

  onSubmit(prevPassword: string, newPassword: string) {
    this.resetPasswordService.changePassword({
      prevPassword: prevPassword,
      password: newPassword,
    });
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

      case "prevPassword":
        if (this.prevPasswordType === "password") {
          this.prevPasswordType = "text";
        } else {
          this.prevPasswordType = "password";
        }
        break;
      default:
        break;
    }
  }
}
