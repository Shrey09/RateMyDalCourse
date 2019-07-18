// Author: Chintan Patel
// Banner ID: B00826089
import { Component, OnInit } from '@angular/core';
import { GetcourseService } from '../getcourse.service';
import { GetuserService } from '../getuser.service';
import { UpdateuserService } from '../updateuser.service';
import { UpdateUser } from './updateuser';
import { NgForm } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  user_name = localStorage.getItem('user_name');
  user_email = localStorage.getItem('user_email');
  updateUserModel: UpdateUser = new UpdateUser(this.user_name, this.user_email, '@Passw0rd', '@Passw0rd', new Array());

  // flags to check updates in data
  errorFlag = false;   // it will be set to true if error is present
  successFlag = false;   // it will be set to true if no error is present
  showMessage: string = null;   // success or error message will stored here

  // All courses which are offered
  CoursesList: any[] = [];   // all courses which are offered
  UserData: any[] = [];   // user data
  UserRegisteredCourses: any[] = [];   // Courses which the user have completed
  CourseAddChoices: any[] = [];   // Courses which user can add as registered
  TempArray: any[] = [];   // This array will be used in checking difference in CoursesList and
  // UserRegisteredCourses
  NewCourses: any[] = [];   // This array will be passed to database as new list of registered courses

  ngOnInit() {
    // fetch courses using getcourse service
    this._courseService.fetchCourses().subscribe(
      data => {
        this.CoursesList = data['Courses'];

        this._userdata.fetchUserData(this.updateUserModel.email).subscribe(
          data => {
            this.UserData = data['User'];
            this.UserRegisteredCourses = data['User']['courses'];

            // https://stackoverflow.com/a/1187628
            // This sourse is used to check difference in arrays.
            for (var i = 0; i < this.CoursesList.length; i++) {
              this.TempArray[this.CoursesList[i]['Code'] + ' ' + this.CoursesList[i]['Name']] = true;
            }

            for (var i = 0; i < this.UserRegisteredCourses.length; i++) {
              if (this.TempArray[this.UserRegisteredCourses[i]]) {
                delete this.TempArray[this.UserRegisteredCourses[i]];
              }
            }

            for (var course in this.TempArray) {
              this.CourseAddChoices.push(course);
            }
            // console.log(this.CourseAddChoices);
          },
          error => {
            this.errorFlag = true;
            this.successFlag = false;
            this.showMessage = "We are facing server problem. Try again later.";
            console.log("UserProfileFetchError: ", error);    // log the error
          }
        );
      },
      error => {
        this.errorFlag = true;
        this.successFlag = false;
        this.showMessage = "We are facing server problem. Try again later.";
        console.log("CourseFetchError: ", error);   // log the error
      },
    );
    setTimeout(function () {
      $('.selectpicker').val('default').selectpicker('refresh');   // refresh the selectpicker with fetched courses
    }, 1000)
  }

  constructor(
    private _courseService: GetcourseService,
    private _userdata: GetuserService,
    private _updateuserService: UpdateuserService,
  ) {
  }

  onSubmit(formData: NgForm, data) {
    // console.log(data);
    var updated_name = data.name;   // updated name
    var updated_password = data.password;   // updated new password
    var old_password = data.old_password;   // updated old password
    var updated_add_course = data.add_courses;   // updated list of add courses
    var updated_drop_course = data.drop_courses;   // updated list of drop courses
    var copy_UserRegisteredCourses = this.UserRegisteredCourses.slice();   // make copy of previously registered courses
    var copy_CourseAddChoices = this.CourseAddChoices.slice();   // make copy of previously added courses
    var encrypt_old_password = "";   // to store encrypted old password
    var encrypt_updated_password = "";   // to store encrypted new password

    // console.log("Updated add course", updated_add_course);
    // console.log("Updated drop course", updated_drop_course);

    // http://codeniro.com/caesars-cipher-algorithm-javascript/
    // this source is used to enrypt old password.
    // Some changes like function removal, shift key changes are made from this source.
    for (var i = 0; i < old_password.length; i++) {
      var c = old_password.charCodeAt(i);

      if (c >= 65 && c <= 90) {
        encrypt_old_password += String.fromCharCode((c - 65 + 13) % 26 + 65);
      }
      else if (c >= 97 && c <= 122) {
        encrypt_old_password += String.fromCharCode((c - 97 + 13) % 26 + 97);
      }
      else {
        encrypt_old_password += old_password.charAt(i);
      }
    }

    if (updated_password != null && updated_password != ''){
      // http://codeniro.com/caesars-cipher-algorithm-javascript/
      // this source is used to enrypt old password.
      // Some changes like function removal, shift key changes are made from this source.
      for (var i = 0; i < updated_password.length; i++) {
        var c = updated_password.charCodeAt(i);

        if (c >= 65 && c <= 90) {
          encrypt_updated_password += String.fromCharCode((c - 65 + 13) % 26 + 65);
        }
        else if (c >= 97 && c <= 122) {
          encrypt_updated_password += String.fromCharCode((c - 97 + 13) % 26 + 97);
        }
        else {
          encrypt_updated_password += updated_password.charAt(i);
        }
      }
    }

    // assign name to model
    if (updated_name == undefined) {
      this.updateUserModel.name = this.UserData['name'];
    }
    else {
      this.updateUserModel.name = updated_name;
    }

    // assign password to model
    if (updated_password == null || updated_password == '') {
      this.updateUserModel.password = encrypt_old_password;
    }
    else {
      this.updateUserModel.password = encrypt_updated_password;
    }

    // add new courses to array
    if (updated_add_course != null) {
      for (var i = 0; i < updated_add_course.length; i++) {
        this.UserRegisteredCourses.push(updated_add_course[i]);   // push new courses to user registered cources
        var index = this.CourseAddChoices.indexOf(updated_add_course[i]);
        if (index > -1) {
          this.CourseAddChoices.splice(index, 1);   // remove courses from previous array.
        }
      }
    }

    // remove desired courses from array
    // https://stackoverflow.com/a/5767357
    if (updated_drop_course != null) {
      for (var i = 0; i < updated_drop_course.length; i++) {
        this.CourseAddChoices.push(updated_drop_course[i]);   // push dropped courses to available courses to add
        var index = this.UserRegisteredCourses.indexOf(updated_drop_course[i]);
        if (index > -1) {
          this.UserRegisteredCourses.splice(index, 1);   // remove courses from previous array
        }
      }
    }

    // assignm new course list to model
    this.updateUserModel.courses = this.UserRegisteredCourses;
    this.updateUserModel.email = this.UserData['email'];
    this.updateUserModel.old_password = encrypt_old_password;

    this._updateuserService.updateUserData(this.updateUserModel).subscribe(
      data => {
        // console.log("Status: ", data["status"]);

        // make changes according to status returned from server
        if (data['status'] == "MODIFIED"){
          this.errorFlag = false;
          this.successFlag = true;
          this.showMessage = "Profile successfully updated.";
          localStorage.setItem('user_name', this.updateUserModel.name);
        }
        else if (data['status'] == 'NOT_MODIFIED'){
          this.errorFlag = true;
          this.successFlag = false;
          this.showMessage = "Old password not matched or nothing to update.";
          this.UserRegisteredCourses = copy_UserRegisteredCourses;
          this.CourseAddChoices = copy_CourseAddChoices;
        }
        else {
          this.errorFlag = true;
          this.successFlag = false;
          this.showMessage = "Something went wrong while update. Please try again.";
          this.UserRegisteredCourses = copy_UserRegisteredCourses;
          this.CourseAddChoices = copy_CourseAddChoices;
        }

        formData.reset();
        (document.getElementById('old_password') as HTMLInputElement).value = "";
        (document.getElementById('password') as HTMLInputElement).value = "";
        (document.getElementById('cpassword') as HTMLInputElement).value = "";
        if (data['status'] == "MODIFIED"){
          (document.getElementById('name') as HTMLInputElement).value = this.updateUserModel.name;
        }
        else {
          (document.getElementById('name') as HTMLInputElement).value = this.UserData['name'];
        }


        // https://stackoverflow.com/a/55257919
        setTimeout(function () {
          $('.selectpicker').selectpicker('refresh');   // refresh selectpicker
        }, 1000);

      },
      error => {
        this.errorFlag = true;
        this.successFlag = false;
        this.showMessage = "We are facing server problem. Try again later.";
        // reset the fields
        formData.reset();
        (document.getElementById('old_password') as HTMLInputElement).value = "";
        (document.getElementById('password') as HTMLInputElement).value = "";
        (document.getElementById('cpassword') as HTMLInputElement).value = "";
        (document.getElementById('name') as HTMLInputElement).value = this.UserData['name'];
        this.UserRegisteredCourses = copy_UserRegisteredCourses;
        this.CourseAddChoices = copy_CourseAddChoices;
        console.log("ServerDownError: ", error);   // log the error
        // https://stackoverflow.com/a/55257919
        setTimeout(function () {
          $('.selectpicker').selectpicker('refresh');   // refresh the selectpicker
        }, 1000);
      }
    );
  }

}
