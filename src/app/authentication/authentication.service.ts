import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthenticationService {
  authenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public authenticate() {
    this.authenticated$.next(true);
  }

  public deauthenticate() {
    this.authenticated$.next(false);
  }
}
