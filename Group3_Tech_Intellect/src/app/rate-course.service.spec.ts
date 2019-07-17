import { TestBed } from '@angular/core/testing';

import { RateCourseService } from './rate-course.service';

describe('RateCourseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RateCourseService = TestBed.get(RateCourseService);
    expect(service).toBeTruthy();
  });
});
