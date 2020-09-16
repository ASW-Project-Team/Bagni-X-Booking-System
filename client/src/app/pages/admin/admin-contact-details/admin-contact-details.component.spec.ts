import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContactDetailsComponent } from './admin-contact-details.component';

describe('AdminContactDetailsComponent', () => {
  let component: AdminContactDetailsComponent;
  let fixture: ComponentFixture<AdminContactDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminContactDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminContactDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
