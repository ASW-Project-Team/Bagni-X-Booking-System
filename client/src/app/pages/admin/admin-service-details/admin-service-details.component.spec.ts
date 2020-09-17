import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminServiceDetailsComponent } from './admin-service-details.component';

describe('ServicesDetailsComponent', () => {
  let component: AdminServiceDetailsComponent;
  let fixture: ComponentFixture<AdminServiceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminServiceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminServiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
