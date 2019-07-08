import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './discussionforum/post';

@Injectable({
  providedIn: 'root'
})
export class CreatePostService {

  url = 'http://localhost:3000/createPost';
  constructor(private httpClient: HttpClient) { }

  createPost(post: Post) {
    return this.httpClient.post<any>(this.url, post);
  }
}
