import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, retry, throwError } from "rxjs";

export class HttpErrorInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     return next.handle(request)
     .pipe(
        retry(1),
        catchError((error: HttpErrorResponse)=>{
            let errorMessage = '';
            if (error.error instanceof ErrorEvent){
                // client-side errors
                errorMessage = `Error: ${error.error.message}`
            }else {
                // server-side errors
                errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`
            }
            window.alert(errorMessage);
            return throwError(errorMessage);
        })
     )
    
    }

}