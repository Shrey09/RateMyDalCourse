import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetuserService {

  _url = "http://localhost:3000/fetchUserData"
  constructor(private _http: HttpClient) { }

  fetchUserData(){
    return this._http.get<any[]>(this._url);
  }
}
