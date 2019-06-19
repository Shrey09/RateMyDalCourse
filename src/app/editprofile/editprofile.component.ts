import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  public username = "Harsh Pamnani";

  ngOnInit() {
    this.authenticationService.authenticate();
  }

  constructor(
    public authenticationService: AuthenticationService,
  ) {
  }


}
