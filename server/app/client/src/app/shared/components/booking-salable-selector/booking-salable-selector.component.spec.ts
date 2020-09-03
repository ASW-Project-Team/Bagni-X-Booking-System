import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingSalableSelectorComponent } from './booking-salable-selector.component';

describe('BookingSalableSelectorComponent', () => {
  let component: BookingSalableSelectorComponent;
  let fixture: ComponentFixture<BookingSalableSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingSalableSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingSalableSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
