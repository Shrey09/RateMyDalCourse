import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Userinput } from './Userinput';
import { AuthenticateUserService } from '../authenticate-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    public authenticateUserService: AuthenticateUserService
  ) {
  }

  isLoading = false;
  userinput: Userinput = new Userinput('harshpam1993@gmail.com', 'Harsh@123');


  onLogin(form) {
    let plainText = '';
    let encryptedText = '';

    plainText = form.value.password;
    for (let i = 0; i < plainText.length; i++) {
      const c = plainText.charCodeAt(i);
      if (c >= 65 && c <= 90) {
        encryptedText += String.fromCharCode((c - 65 + 13) % 26 + 65);
      } else if (c >= 97 && c <= 122) {
        encryptedText += String.fromCharCode((c - 97 + 13) % 26 + 97);
      } else {
        encryptedText += plainText.charAt(i);
      }
    }

    this.userinput.email = form.value.email;
    this.userinput.password = encryptedText;

    this.authenticateUserService.validateUser(this.userinput).
      subscribe(
        // Receiving the data back from the service.
        data => {
          // Assigning all posts received from server to a postsList array in the component.
          console.log('Client : Response from server is: ');
          console.log(data);
        },
        // Handling the error scenario if server connection fails or any other error occurs.
        error => {
          console.log('Client : Error in connecting to server: ', error);
        }
      );
  }
}
