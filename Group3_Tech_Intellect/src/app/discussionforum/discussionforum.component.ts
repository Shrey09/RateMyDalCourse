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

    this.createPostService.createPost(this.postModel)
    .subscribe (
      data => {
        this.postMessage = data.responseMessage;
        console.log('Response from server : ' + this.postMessage);

        // handle the error or successful message response for the server
        if (this.postMessage === 'Please enter some content for the post.') {
          this.isErrorPresent = true;
          this.isSuccess = false;
        } else if (this.postMessage === 'Please enter at least 20 characters for the post.') {
          this.isErrorPresent = true;
          this.isSuccess = false;
        } else if (this.postMessage === 'Post successfully created on discussion forum.') {
          this.isErrorPresent = false;
          this.isSuccess = true;
          (document.getElementById('postContentTextArea') as HTMLInputElement).value = '';
        }
      },
       error => {
         console.log('Some error occured: ', error);
         this.isErrorPresent = true;
         this.isSuccess = false;
         this.postMessage = 'We could not reach our server. '
                            + 'Please try again after some time.';
        }
    );
  }
}
