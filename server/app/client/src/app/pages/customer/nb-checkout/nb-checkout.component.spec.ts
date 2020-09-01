import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NbCheckoutComponent } from './nb-checkout.component';

describe('NbCheckoutComponent', () => {
  let component: NbCheckoutComponent;
  let fixture: ComponentFixture<NbCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NbCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NbCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
