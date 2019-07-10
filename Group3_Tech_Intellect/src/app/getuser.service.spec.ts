import { TestBed } from '@angular/core/testing';

import { GetuserService } from './getuser.service';

describe('GetuserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetuserService = TestBed.get(GetuserService);
    expect(service).toBeTruthy();
  });
});
