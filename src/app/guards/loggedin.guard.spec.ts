import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { loggedinGuard } from './loggedin.guard';

describe('loggedinGuard', () => {
  const executeGuard: CanDeactivateFn<unknown> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loggedinGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
