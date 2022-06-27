import {
  ApplicationContext,
  ContextDataItem,
} from "src/app/util/context/applicationContext";
import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _context: ApplicationContext) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // localStorage.tokenValue; // you probably want to store it in localStorage or something
    const tokenKey = this._context.getData(ContextDataItem.TOKEN_KEY);
    const tokenValue = this._context.getData(ContextDataItem.TOKEN_VALUE);

    if (!tokenKey || !tokenValue) {
      return next.handle(req);
    }

    const req1 = req.clone({
      headers: req.headers.set(tokenKey, tokenValue),
    });

    return next.handle(req1);
  }
}
