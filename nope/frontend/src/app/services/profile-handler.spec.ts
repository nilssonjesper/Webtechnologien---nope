import { TestBed } from '@angular/core/testing';

import { ProfileHandler } from './profile-handler';

describe('ProfileHandler', () => {
  let service: ProfileHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
