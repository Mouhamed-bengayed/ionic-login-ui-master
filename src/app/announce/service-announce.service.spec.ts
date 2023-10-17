import { TestBed } from '@angular/core/testing';

import { ServiceAnnounceService } from './service-announce.service';

describe('ServiceAnnounceService', () => {
  let service: ServiceAnnounceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceAnnounceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
