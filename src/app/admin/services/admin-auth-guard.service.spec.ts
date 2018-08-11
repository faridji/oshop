import { AdminAuthGuard } from './admin-auth-guard.service';
import { TestBed, inject } from '@angular/core/testing';

describe('AdminAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminAuthGuard]
    });
  });

  it('should be created', inject([AdminAuthGuard], (service: AdminAuthGuard ) => {
    expect(service).toBeTruthy();
  }));
});
