import { TestBed } from '@angular/core/testing';

import { DataHandler } from '../services/data-handler';

describe('DataHandler', () => {
  let service: DataHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
