import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Post } from './post';
import { CreatePostService } from '../create-post.service';
import { GetPostsService } from '../get-posts.service';

@Component({
  selector: 'app-discussionforum',
  templateUrl: './discussionforum.component.html',
  styleUrls: ['./discussionforum.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DiscussionforumComponent implements OnInit {
  postModel: Post = new Post('This is a new post.', 'harsh@gmail.com', 'Harsh Pamnani', 'CSCI5408', new Array(), new Date());
  postMessage: string = null;
  isErrorPresent = false;
  isSuccess = false;

  constructor(
    public authenticationService: AuthenticationService, private createPostService: CreatePostService,
    private getPostsService: GetPostsService
  ) {
  }

  postsList: any[] = [];

  ngOnInit() {
    this.authenticationService.authenticate();

    // This course code will be dynamically loaded for whichever course the user clicks.
    const courseCode = 'CSCI3901';
    console.log('discussion forum loaded loaded');
    console.log('posts will be retrieved from server now');
    this.getPostsService.getPosts(courseCode).
    subscribe(
      data => {
      // console.log('Posts fetched form server', data['Posts']);
      // this.Courses = data["Posts"];
      // console.log(this.Courses);
      // console.log('First Post', data['Posts'][0]);
      this.postsList = data.Posts;
    },
      error => {
        console.log('Some error in connecting to server', error);
      }
    );
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

        if (this.postMessage === 'Post successfully created on discussion forum.') {
          this.postsList.push(this.postModel);
          this.isErrorPresent = false;
          this.isSuccess = true;
          (document.getElementById('postContentTextArea') as HTMLInputElement).value = '';
        } else {
          this.isErrorPresent = true;
          this.isSuccess = false;
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
