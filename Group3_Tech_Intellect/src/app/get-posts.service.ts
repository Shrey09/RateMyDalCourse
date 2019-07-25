// Author: Harsh Pamnani - B00802614

// Service for getting all the posts related to particular course from database
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetPostsService {
  constructor(private http: HttpClient) { }

  // Method for fetching the posts from mongodb.
  // This method will processs a GET request on specified URL with course code.
  getPosts(courseCode: string) {
    const url = 'http://localhost:3000/getPosts/' + courseCode;
    return this.http.get<any>(url);
  }

  getCourseFromCode(courseCode: string) {
    const url = 'http://localhost:3000/getCourseFromCode/:' + courseCode;
    return this.http.get<any>(url);
  }
}
