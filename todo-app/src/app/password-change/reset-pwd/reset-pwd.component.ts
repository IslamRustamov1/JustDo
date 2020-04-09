import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { validatePwds } from "../../validators/validators";
import { ResetPasswordService } from "../../services/reset-password/reset-password.service";

@Component({
  selector: "app-reset-pwd",
  templateUrl: "./reset-pwd.component.html",
  styleUrls: ["./reset-pwd.component.scss"],
})
export class ResetPwdComponent implements OnInit {
  @Input() passwordType: string;
  @Input() confPasswordType: string;

  private params: string[] = [];
  reactiveForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private resetPasswordService: ResetPasswordService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.passwordType = "password";
    this.confPasswordType = "password";
    this.params = this.router.url.split("/");
  }

  initForm() {
    this.reactiveForm = this.fb.group({
      password: [null],
      confPassword: [null],
    });
    this.reactiveForm.setValidators(validatePwds);
  }

  // MOVE THIS TO DIFFERENT SERVICE
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

  isControlInvalid(controlName: string): boolean {
    const control = this.reactiveForm.controls[controlName];

    const result = control.invalid && control.touched;

    return result;
  }

  onSubmit(password: string) {
    this.resetPasswordService.changePassword({
      code: this.params.pop(),
      password: password,
    });
  }
}
