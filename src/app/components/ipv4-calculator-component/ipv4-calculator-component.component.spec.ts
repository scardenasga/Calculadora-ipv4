import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ipv4CalculatorComponentComponent } from './ipv4-calculator-component.component';

describe('Ipv4CalculatorComponentComponent', () => {
  let component: Ipv4CalculatorComponentComponent;
  let fixture: ComponentFixture<Ipv4CalculatorComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ipv4CalculatorComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ipv4CalculatorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
