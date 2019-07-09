import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GetCoursesService {

  url = "http://localhost:3000/getCourses";
  constructor(private http: HttpClient) { }

  getCourses() {
    return this.http.get<any[]>(this.url);
  }
}
