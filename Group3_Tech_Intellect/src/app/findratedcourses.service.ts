import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Username } from './dashboard/username';

@Injectable({
  providedIn: 'root'
})
export class FindratedcoursesService {

  // url for making get request
  _url="http://localhost:3000/getRatedCourses";
  constructor(private _http:HttpClient) { }

  getRatedCourses(user:Username){
    return this._http.post<any[]>(this._url,user);
  }
}
