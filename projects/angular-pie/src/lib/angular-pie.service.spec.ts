import { TestBed } from '@angular/core/testing';

import { AngularPieService } from './angular-pie.service';

describe('AngularPieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularPieService = TestBed.get(AngularPieService);
    expect(service).toBeTruthy();
  });
});
