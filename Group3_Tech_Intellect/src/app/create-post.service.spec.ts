// Author: Harsh Pamnani - B00802614

import { TestBed } from '@angular/core/testing';

import { CreatePostService } from './create-post.service';

describe('CreatePostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreatePostService = TestBed.get(CreatePostService);
    expect(service).toBeTruthy();
  });
});
