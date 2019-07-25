import { TestBed } from '@angular/core/testing';

import { UpdatePostService } from './update-post.service';

describe('UpdatePostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdatePostService = TestBed.get(UpdatePostService);
    expect(service).toBeTruthy();
  });
});
