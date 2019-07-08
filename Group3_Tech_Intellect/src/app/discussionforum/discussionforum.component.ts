import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-discussionforum',
  templateUrl: './discussionforum.component.html',
  styleUrls: ['./discussionforum.component.css']
})
export class DiscussionforumComponent implements OnInit {
  ngOnInit() {
    this.authenticationService.authenticate();
  }

  constructor(
    public authenticationService: AuthenticationService,
  ) {
  }


}
