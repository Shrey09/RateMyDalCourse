import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetPostsService {

  url = 'http://localhost:3000/getPosts';

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get<any[]>(this.url);
  }
}
