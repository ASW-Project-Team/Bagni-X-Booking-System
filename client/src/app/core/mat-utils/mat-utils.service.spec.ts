import { TestBed } from '@angular/core/testing';

import { MatUtilsService } from './mat-utils.service';

describe('MatUtilsService', () => {
  let service: MatUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
