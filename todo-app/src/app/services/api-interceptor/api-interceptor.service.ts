import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class ApiInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const baseUrl = "http://localhost:3000";
    const apiReq = req.clone({ url: `${baseUrl}${req.url}` });

    return next.handle(apiReq);
  }
}
