import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingStateExtendedComponent } from './booking-state-extended.component';

describe('BookingStateExtendedComponent', () => {
  let component: BookingStateExtendedComponent;
  let fixture: ComponentFixture<BookingStateExtendedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingStateExtendedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingStateExtendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
