import {AuthenticationService} from "../services/authentication.service";
import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService,
              private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.token}`,
      },
    });

    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if ([401, 403].indexOf(error.status) !== -1) {
            this.authService.logout();
            this.router.navigate(['/login'], {
              queryParams: {
                authFailed: true
              }
            }).then(() => {});
          }

          return throwError(error);
        }),
      );
  }
}
