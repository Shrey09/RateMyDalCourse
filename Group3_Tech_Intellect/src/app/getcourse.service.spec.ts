import { TestBed } from '@angular/core/testing';

import { GetcourseService } from './getcourse.service';

describe('GetcourseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetcourseService = TestBed.get(GetcourseService);
    expect(service).toBeTruthy();
  });
});
