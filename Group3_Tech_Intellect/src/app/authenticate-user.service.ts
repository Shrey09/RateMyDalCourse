import { Injectable } from '@angular/core';
import { Userinput } from './login/Userinput';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateUserService {

  constructor(private httpClient: HttpClient) { }

  // Method for creating the post on mongodb.
  // This method will processs a POST request on specified URL.
  validateUser(userinput: Userinput) {
    const url = 'http://localhost:3000/login';
    return this.httpClient.post<any>(url, userinput);
  }
}
