import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
      },
    });
    return next.handle(request).pipe(
      tap((req: any) => {
        if (req?.status === 200) {
        }
      }),
    //   catchError((error) => {
    //     return this.handleResponseError(error, request, next);
    //   })
    );
  }
}
