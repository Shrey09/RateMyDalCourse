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
  postModel = new Post('This is a new post.', 'harsh@gmail.com', 'Harsh Pamnani', 'CSCI5408', new Array(), new Date());
  postMessage: string = null;
  isErrorPresent = false;
  isSuccess = false;

  constructor(
    public authenticationService: AuthenticationService, private createPostService: CreatePostService,
    private getPostsService: GetPostsService
  ) {
  }

  postModel1 = new Post('This is the first post.', 'harsh@gmail.com', 'Harsh Pamnani', 'CSCI5408',
                          new Array('deep@gmail.com', 'chintan@gmail.com', 'shrey@gmail.com'), new Date());
  postModel2 = new Post('This is the second post.', 'deep@gmail.com', 'Deep Shah', 'CSCI5408',
                          new Array('harsh@gmail.com'), new Date());
  postModel3 = new Post('This is the third post.', 'chintan@gmail.com', 'Chintan Patel', 'CSCI5408',
                          new Array('deep@gmail.com', 'harsh@gmail.com', 'ravi@gmail.com', 'aman@dal.ca'), new Date());

  postsList: any[] = [this.postModel1, this.postModel2, this.postModel3];

  ngOnInit() {
    this.authenticationService.authenticate();

    console.log('discussion forum loaded loaded');
    console.log('posts will be retrieved from server now');
    this.getPostsService.getPosts().
    subscribe(
      data => {
      // console.log('Posts fetched form server', data['Posts']);
      // this.Courses = data["Posts"];
      // console.log(this.Courses);
      // console.log('First Post', data['Posts'][0]);
      this.postsList = data['Posts'];
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

          // const oldHtmlContent = (document.getElementById('commentsSection') as HTMLInputElement).innerHTML;
          // const newHtmlContent = this.generateHtmlForPost(this.postModel);
          // (document.getElementById('commentsSection') as HTMLInputElement).innerHTML = newHtmlContent + oldHtmlContent;
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

  generateHtmlForPost(post) {
    let htmlPost = '<div class="row"><div class="card-body comment"><h5 class="card-title">';
    htmlPost += post.postedByName;
    htmlPost += '</h5><p class="card-text">' + post.postContent;
    htmlPost += '</p><div class="card-text helpful"><span><i class="fas fa-thumbs-up"></i></span> Mark as Helpful (0) </div></div></div>'
    return htmlPost;
  }
}
