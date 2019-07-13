// Author: Shrey Amin
// Banner ID: B00822245

// service for fectching courses in the dropdown
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  // url for making get request
  _url="http://129.173.22.35:19999/getCourses";
  constructor(private _http:HttpClient) { }

  getCourse(){
    return this._http.get<any[]>(this._url);
  }
}
