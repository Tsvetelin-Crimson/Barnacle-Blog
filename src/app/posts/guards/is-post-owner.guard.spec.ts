import { TestBed } from '@angular/core/testing';

import { IsPostOwnerGuard } from './is-post-owner.guard';

describe('IsPostOwnerGuard', () => {
  let guard: IsPostOwnerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsPostOwnerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
