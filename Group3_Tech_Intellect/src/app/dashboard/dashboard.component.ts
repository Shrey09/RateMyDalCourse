// Import all different component to load the dashboard
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { GetCoursesService } from '../get-courses.service';
import { Username } from './username';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import {Rate} from './rate';
import {RateCourseService} from '../rate-course.service';
import {FormGroup} from '@angular/forms'


// Import all the component of the dashboard
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  /* Load all the courses for specific user
     After Login feature is completed user email is passed after successful authentication
  */
  usernameModel = new Username('nitin@gmail.com');
  rateCourseModel=new Rate('course','user@gmail.com',5);
  form: FormGroup;


  constructor(
    public authenticationService: AuthenticationService, public getCoursesService: GetCoursesService,
    private http: HttpClient, private router: Router, private route: ActivatedRoute, private rateCourseService:RateCourseService
  ) {
  }
  //Defined Array to store list of courses while loading dashboard and search option
  coursesList: any[];
  myCoursesList: any[];
  searchedCourses: any[];
  searchedMyCourses: any[];
  copyCourseSearchArray: any[];
  copyMyCourseSearchArray: any[];
  showRateMessage: boolean = false;
  ratemessage: string = null;

  //first method which execute while page load
  ngOnInit() {
    // User should be authenticated when he access the dashboard
    this.authenticationService.authenticate();
    console.log("dashboard loaded");

    // Fetching data from the method of getCourses of service
    //https://www.pubnub.com/docs/nodejs-javascript/data-streams-publish-and-subscribe
    this.getCoursesService.getCourses().
      subscribe(
        data => {
          // List of courses which user has not completed
          this.coursesList = data["Courses"];
          this.copyCourseSearchArray = Object.assign({}, this.coursesList);
        },
        error => {
          console.log("error in connecting to the server service", error)
        });

    this.getCoursesService.getMyCourses(this.usernameModel).
      subscribe(
        data => {
          // List of the courses completed by the user.       
          this.myCoursesList = data["MyCourses"][0]["courses"];
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
          this.copyMyCourseSearchArray = Object.assign({}, this.myCoursesList);
        },
        error => {

          console.log("error in connecting to the server get my courses", error)
        });


    this.route.queryParams.subscribe(params => {

      this.searchedCourses = []
      this.searchedMyCourses = []

        
      // https://stackoverflow.com/questions/154059/how-to-check-empty-undefined-null-string-in-javascript
      if (params.s != '') {

        // Fetching the string which user has entered in the searchbox
        var queryString = params.s;

          // Logic to check if the search course is present in the course list.
          for (var i in this.copyCourseSearchArray) {
            // https://www.google.com/search?q=trim+in+javascript&oq=trim+in+java&aqs=chrome.1.69i57j0l5.5473j0j4&sourceid=chrome&ie=UTF-8
            if (this.copyCourseSearchArray[i].Name.toLowerCase().trim().includes(queryString.toLowerCase().trim()) ||
              this.copyCourseSearchArray[i].Code.toLowerCase().trim().includes(queryString.toLowerCase().trim())) {
              this.searchedCourses.push(this.copyCourseSearchArray[i])
            }
          }

          this.coursesList = this.searchedCourses;


          // Logic to check if search string is present in the user's completed course.
          for (var i in this.copyMyCourseSearchArray) {
            if (this.copyMyCourseSearchArray[i].toLowerCase().trim().includes(queryString)) {
              this.searchedMyCourses.push(this.copyMyCourseSearchArray[i])
            }
          }

          console.log("courses :", this.searchedMyCourses)
          this.myCoursesList = this.searchedMyCourses

        
      } 
    })
  }

  // function for course rating
  onRate(rateForm,course)
  {
    console.log("form submitted with values ",rateForm.rate,course);
    this.rateCourseModel.courseName=course;
    this.rateCourseModel.email=this.usernameModel.name;
    this.rateCourseModel.rating=rateForm.rate;
    this.rateCourseService.rateCourse(this.rateCourseModel)
    .subscribe(data=>{
      // handle the error or successful message response for the server
      if(data["Message"]){
        console.log(data);
        this.showRateMessage=true;
        this.ratemessage=data["Message"];
      }
      
    },
     error=>{
       console.log("Error",error);
      });
  }
  
}
