import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingStateComponent } from './booking-state.component';

describe('BookingStateComponent', () => {
  let component: BookingStateComponent;
  let fixture: ComponentFixture<BookingStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
