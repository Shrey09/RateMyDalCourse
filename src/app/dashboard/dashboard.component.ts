import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  ngOnInit() {
    this.authenticationService.authenticate();
  }

  constructor(
    public authenticationService: AuthenticationService,
  ) {
  }


}
