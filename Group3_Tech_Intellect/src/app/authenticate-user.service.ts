import { Injectable } from '@angular/core';
import { Userinput } from './login/Userinput';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateUserService {

  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private tokenTimer: any;

  getToken() {
    // console.log("Auth Service : Inside GetToken method token is :", this.token);
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  logout() {
    this.token = null;
    this.authStatusListener.next(false);
    this.isAuthenticated = false;
    this.clearAuthData();
    this.router.navigate(['/']);
    clearTimeout(this.tokenTimer);
  }

  constructor(private httpClient: HttpClient, private router: Router) { }

  // Method for creating the post on mongodb.
  // This method will processs a POST request on specified URL.
  validateUser(userinput: Userinput) {
    const url = 'http://localhost:3000/login';
    let message = '';
    this.httpClient.post<any>(url, userinput)
      .subscribe(response => {
        const token = response.token;
        // console.log("Auth Service : Token received from server is :", this.token);
        this.token = token;
        // console.log("Auth Service : Token is :", this.token);

        if (token) {
          const expiresInDuration = response.expiresIn;

          this.setAuthTimer(expiresInDuration);

          this.authStatusListener.next(true);
          this.isAuthenticated = true;

          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate);

          this.router.navigate(['/dashboard']);
        } else {
          this.isAuthenticated = false;
          this.authStatusListener.next(false);
        }
      });
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  public autoAuthUser() {
    const autoInformation = this.getAuthData();
    if (autoInformation) {
      const now = new Date();
      const expiresIn = autoInformation.expirationDate.getTime() - now.getTime();
      if (expiresIn > 0) {
        this.token = autoInformation.token;
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.setAuthTimer(expiresIn / 1000);
      }
    }
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    } else {
      return {
        'token': token,
        'expirationDate': new Date(expirationDate)
      }
    }
  }
}
