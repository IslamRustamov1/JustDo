import { Router } from "@angular/router";
import { Component } from "@angular/core";

import { TokenService } from "../../services/token-service/token.service";

@Component({
  selector: "app-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.scss"]
})
export class DropdownComponent {
  constructor(private tokenService: TokenService, private router: Router) {}

  onLogout() {
    this.tokenService.clearStorage();
    this.router.navigate(["./login"]);
  }
  onChangePassword() {
    this.router.navigate(["./change-password"]);
  }
}
