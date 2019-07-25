import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Username } from './dashboard/username';

@Injectable({
  providedIn: 'root'
})
export class GetCoursesService {

  
  constructor(private http: HttpClient) { }

  getMyCourses(username: Username) {
    const url = "http://localhost:3000/getCourses/:"+username.name;
    return this.http.get<any[]>(url);
  }

  getCourses() {
    const url = "http://localhost:3000/getCourses";
    return this.http.get<any[]>(url);
  }
}
