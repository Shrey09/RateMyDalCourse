import { Component, OnInit } from '@angular/core';
import {User} from './user';
import {RegisterService} from '../register.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  userModel=new User('shrey','x@gmail.com','12345678','12345678','Course-1');
  showErrorMessage: boolean = false;
  showMessage: boolean = false;
  message: string = null;

  constructor(private _registerService:RegisterService) { }

  ngOnInit() {
  }
  onSubmit(form){
    // create model for the new user 
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
