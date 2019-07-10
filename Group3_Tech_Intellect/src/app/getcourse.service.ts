import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetcourseService {

  _url = "http://localhost:3000/fetchCourses"
  constructor(private _http: HttpClient) { }

  fetchCourses(){
    return this._http.get<any[]>(this._url);
  }
}
