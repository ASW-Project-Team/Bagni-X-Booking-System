import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminServicesDetailsComponent } from './admin-services-details.component';

describe('ServicesDetailsComponent', () => {
  let component: AdminServicesDetailsComponent;
  let fixture: ComponentFixture<AdminServicesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminServicesDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminServicesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
