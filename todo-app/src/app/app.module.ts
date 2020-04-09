import { Apollo } from "apollo-angular";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { GraphQLModule } from "./graphql.module";
import { AppComponent } from "./app.component";
import { TodosModule } from "./todos/todos.module";
import { AuthService } from "./services/auth-service/auth.service";
import { DocumentsComponent } from "./documents/documents.component";
import { LoginComponent } from "./authentication/login/login.component";
import { TodoListComponent } from "./todos/todo-list/todo-list.component";
import { SignupComponent } from "./authentication/signup/signup.component";
import { AuthenticationModule } from "./authentication/authentication.module";
import { ResetPwdComponent } from "./password-change/reset-pwd/reset-pwd.component";
import { ForgotPwdComponent } from "./password-change/forgot-pwd/forgot-pwd.component";
//import { ApiInterceptorService } from "./services/api-interceptor/api-interceptor.service";
import { ChangePasswordComponent } from "./password-change/change-password/change-password.component";
import { PasswordChangeModule } from "./password-change/password-change.module";
import { HelpersModule } from "./helpers/helpers.module";

@NgModule({
  declarations: [AppComponent, DocumentsComponent],
  imports: [
    NgbModule,
    FormsModule,
    TodosModule,
    BrowserModule,
    HelpersModule,
    HttpClientModule,
    ReactiveFormsModule,
    AuthenticationModule,
    PasswordChangeModule,
    BrowserAnimationsModule,
    GraphQLModule,
    RouterModule.forRoot([
      {
        path: "",
        component: LoginComponent,
      },
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "signup",
        component: SignupComponent,
      },
      {
        path: "privacy-policy",
        component: DocumentsComponent,
      },
      {
        path: "terms-conditions",
        component: DocumentsComponent,
      },
      {
        path: "forgot-password",
        component: ForgotPwdComponent,
      },
      {
        path: "reset-password/:code",
        component: ResetPwdComponent,
      },
      {
        path: "change-password",
        component: ChangePasswordComponent,
      },
      {
        path: "todos",
        component: TodoListComponent,
        canActivate: [AuthService],
      },
    ]),
    BrowserAnimationsModule,
  ],
  providers: [Apollo],
  bootstrap: [AppComponent],
})
export class AppModule {}
