import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { GetCoursesService } from '../get-courses.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  constructor(
    public authenticationService: AuthenticationService, public getCoursesService: GetCoursesService
  ) {
  }

  ngOnInit() {
    console.log("dashboard loaded");

    this.getCoursesService.getCourses().
    subscribe(
      data =>{
        console.log("Courses fetched");
        console.log(data);
      },
      error=>{
        console.log("error in connecting to server service",error)
      });
  }

}
