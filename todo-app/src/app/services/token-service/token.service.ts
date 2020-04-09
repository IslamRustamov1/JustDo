import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TokenService {
  constructor() {}

  setToken(tkn) {
    localStorage.setItem("token", tkn);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  clearStorage() {
    localStorage.clear();
  }
}
