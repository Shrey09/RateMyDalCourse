import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  _url="http://129.173.22.35:19999/getCourses";
  constructor(private _http:HttpClient) { }

  getCourse(){
    return this._http.get<any[]>(this._url);
  }
}
