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
  postModel = new Post('This is a new post.', 'harsh@gmail.com', 'Harsh Pamnani', 'CSCI5408', new Array(), new Date());
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
    this.postModel.postContent = form.postContent;
    // Other attributes for post like emailId, username, postTime, and course
    // will be added once the login and session management feature is implemented.

    this.createPostService.createPost(this.postModel)
    .subscribe (
      data => {
        this.postMessage = data.responseMessage;
        console.log('Response from server : ' + this.postMessage);

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

          var oldHtmlContent = (document.getElementById('comments') as HTMLInputElement).innerHTML;
          var newHtmlContent = this.generateHtmlForPost(this.postModel);
          (document.getElementById('comments') as HTMLInputElement).innerHTML = newHtmlContent + oldHtmlContent;
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

  generateHtmlForPost(post) {
    var htmlPost = '<div class="row"><div class="card-body comment"><h5 class="card-title">';
    htmlPost += post.postedByName;
    htmlPost += '</h5><p class="card-text">' + post.postContent;
    htmlPost += '</p><div class="card-text helpful"><span><i class="fas fa-thumbs-up"></i></span> Mark as Helpful (0) </div></div></div>'
    return htmlPost;
  }
}
