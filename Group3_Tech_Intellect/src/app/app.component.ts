import { Component, OnInit } from '@angular/core';
import { AuthenticateUserService } from './authenticate-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthenticateUserService) {}

  ngOnInit() {
    this.authService.autoAuthUser();
  }

  title = 'hello-world';
}
