import { TestBed } from '@angular/core/testing';

import { FindratedcoursesService } from './findratedcourses.service';

describe('FindratedcoursesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FindratedcoursesService = TestBed.get(FindratedcoursesService);
    expect(service).toBeTruthy();
  });
});
