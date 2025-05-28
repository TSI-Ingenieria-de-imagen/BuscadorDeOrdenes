import { TestBed } from '@angular/core/testing';

import { BuscarofserviceService } from './buscarofservice.service';

describe('BuscarofserviceService', () => {
  let service: BuscarofserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscarofserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
