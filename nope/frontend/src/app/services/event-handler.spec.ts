import { TestBed } from '@angular/core/testing';

import { EventHandler } from './event-handler';

describe('EventHandler', () => {
  let service: EventHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
