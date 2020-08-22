import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalableCardComponent } from './salable-card.component';

describe('GenericCardComponent', () => {
  let component: SalableCardComponent;
  let fixture: ComponentFixture<SalableCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalableCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalableCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
