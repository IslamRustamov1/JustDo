import { of } from "rxjs";
import { Apollo } from "apollo-angular";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { headers } from "../../constants";
import { IChangePasswordBody } from "src/app/interfaces";
import { TokenService } from "../token-service/token.service";
import {
  sendResetLink,
  ISendResetLink,
} from "../../graphql/sendResetLinkMutation";
import {
  resetPassword,
  IResetPassword,
} from "../../graphql/resetPasswordMutation";
import {
  changePassword,
  IChangePassword,
} from "../../graphql/changePasswordMutation";

@Injectable({
  providedIn: "root",
})
export class ResetPasswordService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private tokenService: TokenService,
    private apollo: Apollo
  ) {}

  sendResetLink(email: string) {
    this.apollo
      .mutate<ISendResetLink>({
        mutation: sendResetLink,
        variables: {
          email: email,
        },
      })
      .subscribe(
        (response) => {
          if (response.data.sendResetLink.message === "Mail successfuly sent") {
            this.router.navigate(["./login"]);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  changePassword(req: IChangePasswordBody) {
    if (req.code) {
      this.apollo
        .mutate<IResetPassword>({
          mutation: resetPassword,
          variables: {
            password: req.password,
            resetPasswordCode: req.code,
          },
        })
        .subscribe(
          (response) => {
            if (
              response.data.resetPassword.message ===
              "Password successfuly reseted"
            ) {
              this.router.navigate(["./login"]);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this.apollo
        .mutate<IChangePassword>({
          mutation: changePassword,
          variables: {
            previousPassword: req.prevPassword,
            newPassword: req.password,
          },
        })
        .subscribe(
          (response) => {
            if (
              response.data.changePassword.message ===
              "Password successfuly changed"
            ) {
              this.router.navigate(["./login"]);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
}
