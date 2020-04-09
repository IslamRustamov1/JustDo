import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

import { Injectable } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { Apollo } from "apollo-angular";

import { loginUser, ILoginUser } from "../../graphql/loginMutation";
import { registerUser, IRegisterUser } from "../../graphql/registerMutation";
import { IAuthenticationBody } from "../../interfaces";
import { TokenService } from "../token-service/token.service";

@Injectable({
  providedIn: "root",
})
export class AuthService implements CanActivate {
  constructor(
    private router: Router,
    private tokenService: TokenService,
    private spinner: NgxSpinnerService,
    private apollo: Apollo
  ) {}

  login(credentials: IAuthenticationBody) {
    this.spinner.show();
    this.apollo
      .mutate<ILoginUser>({
        mutation: loginUser,
        variables: {
          email: credentials.email,
          password: credentials.password,
        },
      })
      .subscribe(
        (response) => {
          this.spinner.hide();
          if (response.data.loginUser.token) {
            this.tokenService.setToken(response.data.loginUser.token);
            this.router.navigate(["./todos"]);
          }
        },
        (error) => {
          this.spinner.hide();
          console.log(error);
        }
      );
  }

  signup(credentials: IAuthenticationBody) {
    this.spinner.show();
    this.apollo
      .mutate<IRegisterUser>({
        mutation: registerUser,
        variables: {
          email: credentials.email,
          password: credentials.password,
        },
      })
      .subscribe(
        (response) => {
          this.spinner.hide();
          if (response.data.registerUser.email !== "") {
            this.router.navigate(["./login"]);
          }
        },
        (error) => {
          this.spinner.hide();
          console.log(error);
        }
      );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.tokenService.getToken()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
