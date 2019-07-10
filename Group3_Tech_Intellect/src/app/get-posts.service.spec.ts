import { TestBed } from '@angular/core/testing';

import { GetPostsService } from './get-posts.service';

describe('GetPostsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetPostsService = TestBed.get(GetPostsService);
    expect(service).toBeTruthy();
  });
});
