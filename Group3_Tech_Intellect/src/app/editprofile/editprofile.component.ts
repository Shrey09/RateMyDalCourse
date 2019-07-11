import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { GetcourseService } from '../getcourse.service';
import { GetuserService } from '../getuser.service';
import { UpdateuserService } from '../updateuser.service';
import { UpdateUser } from './updateuser';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  updateUserModel: UpdateUser = new UpdateUser('Chintan Patel', 'chintan.patel@dal.ca', '@Passw0rd', '@Passw0rd', new Array());

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
    this.authenticationService.authenticate();

    // fetch courses using getcourse service
    this._courseService.fetchCourses().subscribe(
      data => {
        console.log(data);
        this.CoursesList = data['Courses'];

        this._userdata.fetchUserData().subscribe(
          data => {
            console.log(data['User']);
            this.UserData = data['User'];
            this.UserRegisteredCourses = data['User']['courses'];

            // https://stackoverflow.com/a/1187628
            for (var i = 0; i < this.CoursesList.length; i++) {
              this.TempArray[this.CoursesList[i]['Name']] = true;
            }

            for (var i = 0; i < this.UserRegisteredCourses.length; i++) {
              if (this.TempArray[this.UserRegisteredCourses[i]]) {
                delete this.TempArray[this.UserRegisteredCourses[i]];
              }
            }

            for (var course in this.TempArray) {
              this.CourseAddChoices.push(course);
            }
          },
          error => {
            console.log("Error while fetching user data", error);
          }
        );
      },
      error => {
        console.log("Error while fetching courses", error);
      },
    );

  }

  constructor(
    public authenticationService: AuthenticationService,
    private _courseService: GetcourseService,
    private _userdata: GetuserService,
    private _updateuserService: UpdateuserService,
  ) {
  }

  onSubmit(data) {
    var updated_name = data.name;
    var updated_password = data.password;
    var old_password = data.old_password;
    var updated_add_course = data.add_courses;
    var updated_drop_course = data.drop_courses;
    var copy_UserRegisteredCourses = this.UserRegisteredCourses.slice();
    var copy_CourseAddChoices = this.CourseAddChoices.slice();
    var encrypt_old_password = "";
    var encrypt_updated_password = "";

    // http://codeniro.com/caesars-cipher-algorithm-javascript/
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

    // http://codeniro.com/caesars-cipher-algorithm-javascript/
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

    console.log("Encrypted password: ", encrypt_old_password);
    console.log("Encrypted new password: ", encrypt_updated_password);

    // assign name to model
    if (updated_name == undefined) {
      this.updateUserModel.name = this.UserData['name'];
    }
    else {
      this.updateUserModel.name = updated_name;
    }

    // assign password to model
    if (updated_password == '') {
      this.updateUserModel.password = encrypt_old_password;
    }
    else {
      this.updateUserModel.password = encrypt_updated_password;
    }

    // add new courses to array
    if (updated_add_course != null) {
      for (var i = 0; i < updated_add_course.length; i++) {
        this.UserRegisteredCourses.push(updated_add_course[i]);
      }
    }

    // remove desired courses from array
    // https://stackoverflow.com/a/5767357
    if (updated_drop_course != null) {
      for (var i = 0; i < updated_drop_course.length; i++) {
        this.CourseAddChoices.push(updated_drop_course[i]);
        var index = this.UserRegisteredCourses.indexOf(updated_drop_course[i]);
        if (index > -1) {
          this.UserRegisteredCourses.splice(index, 1);
        }
      }
    }

    // assignm new course list to model
    this.updateUserModel.courses = this.UserRegisteredCourses;
    this.updateUserModel.email = this.UserData['email'];
    this.updateUserModel.old_password = encrypt_old_password;
    console.log(this.UserRegisteredCourses);
    console.log("Model: ", this.updateUserModel);

    this._updateuserService.updateUserData(this.updateUserModel).subscribe(
      data => {
        console.log("Status: ", data["status"]);
        if (data['status'] == "MODIFIED"){
          this.errorFlag = false;
          this.successFlag = true;
          this.showMessage = "Profile successfully updated.";
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
        // reset the fields
        (document.getElementById('old_password') as HTMLInputElement).value = "";
        (document.getElementById('password') as HTMLInputElement).value = "";
        (document.getElementById('cpassword') as HTMLInputElement).value = "";
      },
      error => {
        console.log("Error: ", error);
      }
    );
  }

}
