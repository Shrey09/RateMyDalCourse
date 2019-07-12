import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { GetCoursesService } from '../get-courses.service';
import {Username} from './username';
import { HttpClient } from '@angular/common/http';
import {Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  usernameModel = new Username('nitin@gmail.com');
  private data: any;
  private categories: any;
  private subRoute;
  private cardsByCategory: any;
  private noError : boolean=true;
  private pressed :boolean;

  constructor(
    public authenticationService: AuthenticationService, public getCoursesService: GetCoursesService,
    private http: HttpClient,private router:Router,private route: ActivatedRoute
  ) {
  }
  coursesList : any[];
  myCoursesList : any[];
  searchedCourses: any[];
  searchedMyCourses:any[];

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

      
    this.route.queryParams.subscribe(params => {
 
      this.searchedCourses = []
      this.searchedMyCourses = []

      if (params.s) {

          var queryString = params.s;

          for (var i in this.coursesList)
          {
            if(this.coursesList[i].Name.toLowerCase().trim().includes(queryString.toLowerCase().trim()) || 
            this.coursesList[i].Code.toLowerCase().trim().includes(queryString.toLowerCase().trim()))
            {
              this.searchedCourses.push(this.coursesList[i])
            }
          }
          console.log("courses :",this.searchedCourses)
          this.coursesList = this.searchedCourses;

          for (var i in this.myCoursesList)
          {
            if(this.myCoursesList[i].toLowerCase().trim().includes(queryString))
            {
              this.searchedMyCourses.push(this.myCoursesList[i])
            }
          }

          console.log("courses :",this.searchedMyCourses)
          this.myCoursesList = this.searchedMyCourses
          
      }
     
    })
  }

}
