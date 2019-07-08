import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthenticationService {
  isUserAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public authenticate() {
    this.isUserAuthenticated$.next(true);
  }

  public deauthenticate() {
    this.isUserAuthenticated$.next(false);
  }
}
