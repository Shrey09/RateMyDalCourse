import { Component, OnInit } from '@angular/core';
import {User} from './user';
import {Course} from './course';
import {RegisterService} from '../register.service';
import {CourseService} from '../course.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  // user model for new user 
  userModel=new User('shrey','x@gmail.com','12345678','12345678','Course-1');
  // course list to populate dropdown menu
  Courses:any=[{"_id":"1","Name":"Data Science"},
  {"_id":"2","Name":"Cloud Computing"},
  {"_id":"3","Name":"Quality Assurance"},
  {"_id":"4","Name":"Mobile Computing"},
  {"_id":"5","Name":"Web Technology"}];  

  showCourses=false;
  showErrorMessage: boolean = false;
  showMessage: boolean = false;
  message: string = null;

  // initalise the web service to send request to the server
  constructor(private _registerService:RegisterService,private _courseService:CourseService) { 
    
  }

  ngOnInit() {
    // fetching the courses from the database to create option into dropdown
    console.log("event loaded");
    // calling the web service and getting observable reponse
    this._courseService.getCourse().
    subscribe(courses=>{
      console.log("Courses fetched",courses["Courses"]);
      this.Courses=courses["Courses"];
      console.log(courses);
      
    },
    error=>console.log("error",error));
  }

  // method for sending form data to the server
  onSubmit(form){
    // create usermodel for the new user and stroing the details
    this.userModel.name=form.name;
    this.userModel.email=form.email;
    this.userModel.password=form.password;
    this.userModel.confirmPassword=form.cpassword;
    this.userModel.courses=form.courses;
    console.log("user model",this.userModel);
    // pass user data to the server
    this._registerService.register(this.userModel)
    .subscribe(data=>{
      // handle the error or successful message response for the server
      if(data["Message"]=="Entered email or username already exist"){
        console.log(data);
        this.showErrorMessage=true;
        this.showMessage=false;
        this.message=data["Message"];
      }
      if(data["Message"]=="Registration successful. Please login to continue"){
        console.log(data);
        this.showMessage=true;
        this.showErrorMessage=false;
        this.message=data["Message"];
      }      
    },
     error=>{
       console.log("Error",error);
       this.showErrorMessage=true;
        this.showMessage=false;
        this.message="Improper network connection. Please try after sometime";
      });
    
  }

}
