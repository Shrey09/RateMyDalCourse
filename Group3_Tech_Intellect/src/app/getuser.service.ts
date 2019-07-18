// Author: Chintan Patel
// Banner ID: B00826089
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

// this service is used to fetch user data from MongoAtlas.
export class GetuserService {


  constructor(private _http: HttpClient) { }

  fetchUserData(email: string){
    var _url = "http://localhost:3000/fetchUserData/" + email;
    return this._http.get<any[]>(_url);
  }
}
