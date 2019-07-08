import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Post } from './post';
import { CreatePostService } from '../create-post.service';


@Component({
  selector: 'app-discussionforum',
  templateUrl: './discussionforum.component.html',
  styleUrls: ['./discussionforum.component.css']
})
export class DiscussionforumComponent implements OnInit {
  postModel = new Post('abcd@fake.com', 'this is the new post');
  postMessage: string = null;
  isErrorPresent = false;
  isSuccess = false;

  ngOnInit() {
    this.authenticationService.authenticate();
  }

  constructor(
    public authenticationService: AuthenticationService, private createPostService: CreatePostService
  ) {
  }

  onSubmit(form) {
    // Once the log in functionality is implemented, this email address will be taken from the user's session.
    this.postModel.email = 'harshpam1993@gmail.com';
    this.postModel.postContent = form.postContent;

    if (this.postModel.postContent == null) {
      console.log('Please enter some content for the post');
      this.isSuccess = false;
      this.isErrorPresent = true;
      this.postMessage = 'Please enter some content for the post';
    } else if (this.postModel.postContent.length < 20) {
      console.log('Please enter at least 20 characters for the post.');
      this.isSuccess = false;
      this.isErrorPresent = true;
      this.postMessage = 'Please enter at least 20 characters for the post.';
    } else {
      this.isErrorPresent = false;
      this.isSuccess = true;
      console.log(this.postModel);
      this.postMessage = 'Post successfully created on discussion forum.';

      this.createPostService.createPost(this.postModel)
      .subscribe (
        data => console.log('Success HP!', data),
        error => console.error('Error HP!', error)
      );
    }
  }
}
