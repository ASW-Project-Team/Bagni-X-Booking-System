import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NbPeriodComponent } from './nb-period.component';

describe('NbPeriodComponent', () => {
  let component: NbPeriodComponent;
  let fixture: ComponentFixture<NbPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NbPeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NbPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
