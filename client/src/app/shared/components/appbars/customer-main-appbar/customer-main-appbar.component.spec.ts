import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMainAppbarComponent } from './customer-main-appbar.component';

describe('CustomerMainAppbarComponent', () => {
  let component: CustomerMainAppbarComponent;
  let fixture: ComponentFixture<CustomerMainAppbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerMainAppbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerMainAppbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
