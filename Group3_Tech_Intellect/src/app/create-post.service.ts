// Author: Harsh Pamnani - B00802614

// Service for creating a new post.
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './discussionforum/post';

@Injectable({
  providedIn: 'root'
})
export class CreatePostService {
  constructor(private httpClient: HttpClient) { }

  // Method for creating the post on mongodb.
  // This method will processs a POST request on specified URL.
  createPost(post: Post) {
    const url = 'http://129.173.22.35:24125/createPost';
    return this.httpClient.post<any>(url, post);
  }
}
