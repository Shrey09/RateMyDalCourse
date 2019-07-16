import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticateUserService } from '../authenticate-user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent implements OnInit, OnDestroy {
  private authListenerSubs: Subscription;
  public userIsAuthenticated = false;
  constructor(
    private router: Router,
    private authUserService: AuthenticateUserService
  ) {
  }

  ngOnInit() {
    this.userIsAuthenticated = this.authUserService.getIsAuth();
    this.authListenerSubs = this.authUserService.getAuthStatusListener()
                              .subscribe(
                                isAuthenticated => {
                                  this.userIsAuthenticated = isAuthenticated;
                                });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  onLogout() {
    this.authUserService.logout();
  }

  // Operations perform when user clicks on the search button
  onSubmit(searchString: string) {

    // Entire dashboard is displayed when user doesn't provide any input on search button
    if (!searchString) {
      location.reload();
      this.router.navigateByUrl('dashboard');
    }

    // Entire dashboard is displayed when user provide multiple space on search button
    else if (searchString.trim() == "") {

      location.reload();
      this.router.navigateByUrl('dashboard');
    }

    // Alert is displayed when user enters special character
    // https://stackoverflow.com/questions/16667329/special-character-validation
    else if (/[^a-zA-Z0-9\-\/]/.test(searchString)) {
      alert('Input should be only alphanumeric');
    }
    else {
      this.router.navigateByUrl('dashboard?s=' + searchString);
    }

  }



}
