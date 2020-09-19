import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregCustomerFormComponent } from './unreg-customer-form.component';

describe('UnregCustomerFormComponent', () => {
  let component: UnregCustomerFormComponent;
  let fixture: ComponentFixture<UnregCustomerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnregCustomerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnregCustomerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
