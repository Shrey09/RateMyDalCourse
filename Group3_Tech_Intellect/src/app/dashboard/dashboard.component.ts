import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { GetCoursesService } from '../get-courses.service';
import {Username} from './username';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  usernameModel = new Username('nitin@gmail.com');
  constructor(
    public authenticationService: AuthenticationService, public getCoursesService: GetCoursesService,
    
  ) {
  }
  coursesList : any[];
  myCoursesList : any[];

  ngOnInit() {
    this.authenticationService.authenticate();
    console.log("dashboard loaded");

    this.getCoursesService.getCourses().
    subscribe(
      data =>{
        console.log("Courses fetched");
        console.log(data["Courses"]);
        this.coursesList = data["Courses"];
      },
      error=>{
        console.log("error in connecting to the server service",error)
      });
    
    this.getCoursesService.getMyCourses(this.usernameModel).
    subscribe(
      data =>{
        console.log("My courses fetched");
        console.log(data["MyCourses"]);
        this.myCoursesList = data["MyCourses"][0]["courses"];
        
        console.log(this.myCoursesList);
      },
      error=>{
        console.log("error in connecting to the server get my courses",error)
      });
      
  }

}
