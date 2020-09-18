import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomeCardDetailsComponent } from './admin-home-card-details.component';

describe('AdminHomeCardDetailsComponent', () => {
  let component: AdminHomeCardDetailsComponent;
  let fixture: ComponentFixture<AdminHomeCardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminHomeCardDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHomeCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
