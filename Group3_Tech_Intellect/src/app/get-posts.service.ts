import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetPostsService {
  constructor(private http: HttpClient) { }

  getPosts(courseCode: string) {
    const url = 'http://localhost:3000/getPosts/:' + courseCode;
    return this.http.get<any>(url);
  }
}
