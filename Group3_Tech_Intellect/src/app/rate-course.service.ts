import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Rate} from './dashboard/rate';

@Injectable({
  providedIn: 'root'
})
export class RateCourseService {

  constructor(private _http:HttpClient) { }
  _url="http://localhost:3000/rateCourse";
   // calling register event
   rateCourse(rate: Rate){
    return this._http.post<any>(this._url,rate);
  }
}
