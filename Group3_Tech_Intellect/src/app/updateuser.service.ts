// Author: Chintan Patel
// Banner ID: B00826089
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UpdateUser } from './editprofile/updateuser';

@Injectable({
  providedIn: 'root'
})

// this service will be used to update user data in MongoAtlas.
export class UpdateuserService {

  _url = "http://localhost:3000/updateUserData";
  constructor(private _http: HttpClient) { }

  updateUserData(userdata: UpdateUser){
    return this._http.post<any>(this._url, userdata);
  }
}
