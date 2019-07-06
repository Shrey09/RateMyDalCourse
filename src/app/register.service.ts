import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './registration/user';

@Injectable({
  providedIn: 'root'
})
// create service for user registration
export class RegisterService {

  // sending request to server on port 3000
  _url="http://localhost:3000/register_user";
  constructor(private _http:HttpClient) {
    
   }
   register(user: User){
    return this._http.post<any>(this._url,user);
  }
}
