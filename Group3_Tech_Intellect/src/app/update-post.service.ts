// Author: Chintan Patel
// Banner ID: B00826089
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DiscussionforumComponent } from './discussionforum/discussionforum.component';

@Injectable({
  providedIn: 'root'
})
export class UpdatePostService {

  _url = "http://localhost:3000/markPostAsHelpful";
  constructor(private _http: HttpClient) { }

  markPostAsHelpful(postID: DiscussionforumComponent['postIDToUpdate'], updatedUsers: DiscussionforumComponent['updatedUserList']){
    console.log("postID", postID);
    console.log("updatedUsers", updatedUsers);
    return this._http.post<any>(this._url, {postID: postID, updatedUsers: updatedUsers});
  }
}
