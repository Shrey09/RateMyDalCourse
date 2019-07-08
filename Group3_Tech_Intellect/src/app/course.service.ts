import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  _url="http://localhost:3000/getCourses";
  constructor(private _http:HttpClient) { }

  getCourse(){
    return this._http.get<any[]>(this._url);
  }
}
