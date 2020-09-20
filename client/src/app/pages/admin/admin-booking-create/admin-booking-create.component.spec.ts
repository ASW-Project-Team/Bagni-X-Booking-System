import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBookingCreateComponent } from './admin-booking-create.component';

describe('AdminNewBookingComponent', () => {
  let component: AdminBookingCreateComponent;
  let fixture: ComponentFixture<AdminBookingCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBookingCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBookingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
