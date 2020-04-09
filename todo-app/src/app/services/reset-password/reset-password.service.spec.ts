import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { ResetPasswordService } from "./reset-password.service";
import { Apollo } from "apollo-angular";

describe("ResetPasswordService", () => {
  let service: ResetPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [HttpClient, HttpHandler, Apollo],
    });
    service = TestBed.inject(ResetPasswordService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
