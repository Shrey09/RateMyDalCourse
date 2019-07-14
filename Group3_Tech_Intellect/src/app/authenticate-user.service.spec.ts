import { TestBed } from '@angular/core/testing';

import { AuthenticateUserService } from './authenticate-user.service';

describe('AuthenticateUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthenticateUserService = TestBed.get(AuthenticateUserService);
    expect(service).toBeTruthy();
  });
});
