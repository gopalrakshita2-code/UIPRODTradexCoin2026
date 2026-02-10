import { TestBed } from '@angular/core/testing';

import { Coinservice } from './coinservice';

describe('Coinservice', () => {
  let service: Coinservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Coinservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
