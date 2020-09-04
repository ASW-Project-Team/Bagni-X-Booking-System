import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeStepComponent } from './customize-step.component';

describe('NbCustomizeComponent', () => {
  let component: CustomizeStepComponent;
  let fixture: ComponentFixture<CustomizeStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomizeStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizeStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
