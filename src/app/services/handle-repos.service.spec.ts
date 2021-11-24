import { TestBed } from '@angular/core/testing';

import { HandleReposService } from './handle-repos.service';

describe('HandleReposService', () => {
  let service: HandleReposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleReposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
