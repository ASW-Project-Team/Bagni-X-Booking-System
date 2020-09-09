import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBookingAppbarComponent } from './new-booking-appbar.component';

describe('NewBookingAppbarComponent', () => {
  let component: NewBookingAppbarComponent;
  let fixture: ComponentFixture<NewBookingAppbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBookingAppbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBookingAppbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
