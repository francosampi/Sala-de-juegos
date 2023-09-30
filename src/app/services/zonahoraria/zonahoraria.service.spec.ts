import { TestBed } from '@angular/core/testing';

import { ZonahorariaService } from './zonahoraria.service';

describe('ZonahorariaService', () => {
  let service: ZonahorariaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZonahorariaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
