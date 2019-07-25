import { TestBed } from '@angular/core/testing';

import { GetCoursesService } from './get-courses.service';

describe('GetCoursesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetCoursesService = TestBed.get(GetCoursesService);
    expect(service).toBeTruthy();
  });
});
