import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerStepComponent } from './customer-step.component';

describe('CustomerStepComponent', () => {
  let component: CustomerStepComponent;
  let fixture: ComponentFixture<CustomerStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
