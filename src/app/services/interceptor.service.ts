
import { catchError, switchMap, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import {HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse} 
    from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAccessToken();

    let authReq = req;

    if (req.url.includes('/api/authorization/refresh')) {
      return next.handle(authReq);
    }

    if (token) {
      authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.authService.refreshToken().pipe(
            switchMap(({ accessToken }) => {
              const newReq = req.clone({
                setHeaders: { Authorization: `Bearer ${accessToken}` }
              });
              return next.handle(newReq);
            }),
            catchError(refreshError => {
              this.authService.logout();
              return throwError(() => refreshError); 
            })
          );
        } else if (error.status === 403) {
          this.authService.logout();
        }

        return throwError(() => error);
      })
    );
}
}