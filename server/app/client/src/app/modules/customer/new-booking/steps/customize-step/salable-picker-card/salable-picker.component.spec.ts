import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalablePickerComponent } from './salable-picker.component';

describe('BookingSalableSelectorComponent', () => {
  let component: SalablePickerComponent;
  let fixture: ComponentFixture<SalablePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalablePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalablePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
