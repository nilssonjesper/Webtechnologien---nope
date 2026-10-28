import { TestBed } from '@angular/core/testing';

import { LoginHandler } from './login-handler';

describe('LoginHandler', () => {
  let service: LoginHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
