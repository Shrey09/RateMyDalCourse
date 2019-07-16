// Author: Shrey Amin
// Banner ID: B00822245

import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { RegisterService } from '../register.service';
import { CourseService } from '../course.service';
declare var $: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  // user model for new user
  userModel = new User('shrey', 'x@gmail.com', '12345678', 'Course-1');
  // course list to populate dropdown menu
  CoursesList: any[] = [];

  plainText: string = "";
  encryptedText: string = "";

  // flags for displaying error or response message from the server
  showCourses = false;
  showErrorMessage: boolean = false;
  showMessage: boolean = false;
  message: string = null;


  // initalise the web service to send request to the server
  constructor(private _registerService: RegisterService, private _courseService: CourseService) {

  }

  ngOnInit() {
    // fetching the courses from the database to create option into dropdown
    this._courseService.getCourse().
      subscribe(
        data => {
          console.log('courses fetched form server', data['Courses']);
          this.CoursesList = data['Courses'];
        },
        error => {
          console.log('Some error in connecting to server', error);
        }
      );
    setTimeout(function () {
      $('.selectpicker').val('default').selectpicker('refresh');
    }, 1000)
  }

  // method for sending user data to the server when form is submitted
  onSubmit(form) {

    // encrypting password using ceasar cipher (reference:- http://codeniro.com/caesars-cipher-algorithm-javascript/ )
    this.plainText = form.password;
    for (var i = 0; i < this.plainText.length; i++) {
      var c = this.plainText.charCodeAt(i);
      if (c >= 65 && c <= 90) {
        this.encryptedText += String.fromCharCode((c - 65 + 13) % 26 + 65);
      }
      else if (c >= 97 && c <= 122) {
        this.encryptedText += String.fromCharCode((c - 97 + 13) % 26 + 97);
      }
      else {
        this.encryptedText += this.plainText.charAt(i);
      }
    }
    // create usermodel for the new user and storing the details
    this.userModel.name = form.name;
    this.userModel.email = form.email;
    this.userModel.password = this.encryptedText;
    this.userModel.courses = form.courses;
    console.log("user model", this.userModel);
    // send user data to the server using register event
    this._registerService.register(this.userModel)
      .subscribe(data => {
        // handle the error or successful message response for the server
        if (data["Message"] == "Entered email or username already exist") {
          console.log(data);
          this.showErrorMessage = true;
          this.showMessage = false;
          this.message = data["Message"];
        }
        if (data["Message"] == "Registration successful. Please login to continue") {
          // reseting form after successful registration`
          (document.getElementById('name') as HTMLInputElement).value = "";
          (document.getElementById('email') as HTMLInputElement).value = "";
          (document.getElementById('password') as HTMLInputElement).value = "";
          (document.getElementById('cpassword') as HTMLInputElement).value = "";
          (document.getElementById('courses') as HTMLInputElement).value = "";
          console.log(data);
          this.showMessage = true;
          this.showErrorMessage = false;
          this.message = data["Message"];
        }
      },
        error => {
          console.log("Error", error);
          this.showErrorMessage = true;
          this.showMessage = false;
          this.message = "Improper network connection. Please try after sometime";
        });

  }



}
