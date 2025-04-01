import { TestBed } from '@angular/core/testing';

import { CalculatorIpv4Service } from './calculator-ipv4.service';

describe('CalculatorIpv4Service', () => {
  let service: CalculatorIpv4Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorIpv4Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
