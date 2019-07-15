 // Author: Deep Nimesh Shah - B00796368
 
 // Import all different component to load the dashboard
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent {
  constructor(
    public authenticationService: AuthenticationService,private router: Router
  ) {
  }


  // Operations perform when user clicks on the search button
  onSubmit(searchString: string) {
   
    // Entire dashboard is displayed when user doesn't provide any input on search button
    if(!searchString)
    {
      location.reload();
      this.router.navigateByUrl('dashboard');
    }

    // Entire dashboard is displayed when user provide multiple space on search button
    else if(searchString.trim() == "")
    { 
      
      location.reload();
      this.router.navigateByUrl('dashboard');
    }

    // Alert is displayed when user enters special character
    // https://stackoverflow.com/questions/16667329/special-character-validation
    
    else if(/[^a-zA-Z0-9\-\/]/.test(searchString))
    {
      alert('Input should be only alphanumeric');
    }
    else
    {
      // string is attached to the URL of the dashboard.
      this.router.navigateByUrl('dashboard?s=' + searchString);
    }
    
  }
  


}
