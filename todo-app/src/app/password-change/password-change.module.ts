import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";

import { ChangePasswordComponent } from "./change-password/change-password.component";
import { ForgotPwdComponent } from "./forgot-pwd/forgot-pwd.component";
import { ResetPwdComponent } from "./reset-pwd/reset-pwd.component";

@NgModule({
  declarations: [
    ChangePasswordComponent,
    ForgotPwdComponent,
    ResetPwdComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule],
})
export class PasswordChangeModule {}
