// Author: Chintan Patel
// Banner ID: B00826089
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

// this service is used to fetch user data from MongoAtlas.
export class GetuserService {

  _url = "http://localhost:3000/fetchUserData"
  constructor(private _http: HttpClient) { }

  fetchUserData(){
    return this._http.get<any[]>(this._url);
  }
}
