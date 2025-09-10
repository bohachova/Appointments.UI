import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { config } from "../../environments/environment";
import { Router } from '@angular/router';
import { AuthRequest } from '../models/requests/authRequest.interface';
import { Customer } from '../models/customer.interface';
import { of } from 'rxjs';
import { RefreshTokenRequest } from '../models/requests/refreshTokenRequest.interface';
import { AuthResponse } from '../responses/authResponse.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';
  private userId = 'user_id';

  private _loggedIn$ = new BehaviorSubject<boolean>(this.getAccessToken() != null);
  public loggedIn$ = this._loggedIn$.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  setAccessToken(token: string): void {
    localStorage.setItem(this.accessTokenKey, token);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  setRefreshToken(token: string): void {
    localStorage.setItem(this.refreshTokenKey, token);
  }

  getUserId (): string | null{
    return localStorage.getItem(this.userId);
  }

  setUserId(userId : string): void {
    localStorage.setItem(this.userId, userId );
  }

  autoLogin() : Observable<boolean>{
    return this.refreshToken().pipe(
      map(() => true), 
      catchError(() => {
        this._loggedIn$.next(false);
        return of(false)
      })
    );
  }

  authorization(request: AuthRequest): Observable<AuthResponse>{
    const url = `${config.apiEndpoint}/api/authorization/authorize`;
    return this.http.post<AuthResponse>(url, request).pipe(
        tap(response => {
          this.setAccessToken(response.accessToken);
          this.setRefreshToken(response.refreshToken);
          this.setUserId(response.userId.toString());

          this._loggedIn$.next(true);
        })
    );
  }

  registration(customer : Customer): Observable<AuthResponse>{
    const url = `${config.apiEndpoint}/api/authorization/registration`;
    return this.http.post<AuthResponse>(url, customer).pipe(
        tap(response => {
          this.setAccessToken(response.accessToken);
          this.setRefreshToken(response.refreshToken);
          this.setUserId(response.userId.toString());

          this._loggedIn$.next(true);
        })
    );
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.getRefreshToken();
    if(!refreshToken){
      return throwError(() => new Error('No refresh token'));
    }
    const userId = this.getUserId();
    const request : RefreshTokenRequest = {
      userId : Number(userId),
      refreshToken: refreshToken!
    };
    const url = `${config.apiEndpoint}/api/authorization/refresh`;
    return this.http.post<AuthResponse>(url, request).pipe(
      tap(response => {
        this.setAccessToken(response.accessToken);
        this.setRefreshToken(response.refreshToken);
        this._loggedIn$.next(true);
      })
    );
  }

  logout(): void {
    this.cleanOldTokens();
    this._loggedIn$.next(false);
    this.router.navigate(['/']);
  }

  cleanOldTokens(): void{
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userId);
  }
}

