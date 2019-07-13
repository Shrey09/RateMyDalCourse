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

  onSubmit(searchString: string) {
   
    if(!searchString)
    {
      location.reload();
      this.router.navigateByUrl('dashboard');
    }
    else if(searchString.trim() == "")
    { 
      console.log("Here herer");
      location.reload();
      this.router.navigateByUrl('dashboard');
    }
    else
    {
      this.router.navigateByUrl('dashboard?s=' + searchString);
    }
    
  }
  


}
