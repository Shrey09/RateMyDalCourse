// Author: Chintan Patel
// Banner ID: B00826089
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

// this service will be used to fetch courses from MongoAtlas.
// this courses are all the courses which are offered by the department.
export class GetcourseService {

  _url = "http://localhost:3000/fetchCourses"
  constructor(private _http: HttpClient) { }

  fetchCourses(){
    return this._http.get<any[]>(this._url);
  }
}
