// Author: Shrey Amin
// Banner ID: B00822245

// service for registration
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './registration/user';

@Injectable({
  providedIn: 'root'
})
// create service for user registration
export class RegisterService {

  // sending request to server on port 19999
  _url="http://localhost:3000/register_user";
  constructor(private _http:HttpClient) {

   }
   // calling register event
   register(user: User){
    return this._http.post<any>(this._url,user);
  }
}
