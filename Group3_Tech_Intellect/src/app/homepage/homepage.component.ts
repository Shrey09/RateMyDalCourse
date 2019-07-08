import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthenticationService } from '../authentication/authentication.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  ngOnInit() {
    this.authenticationService.deauthenticate();
  }

  constructor(
    public authenticationService: AuthenticationService,
  ) {
  }
}
