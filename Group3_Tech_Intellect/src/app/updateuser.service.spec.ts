import { TestBed } from '@angular/core/testing';

import { UpdateuserService } from './updateuser.service';

describe('UpdateuserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateuserService = TestBed.get(UpdateuserService);
    expect(service).toBeTruthy();
  });
});
