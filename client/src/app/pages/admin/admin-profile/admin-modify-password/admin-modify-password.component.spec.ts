import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModifyPasswordComponent } from './admin-modify-password.component';

describe('ModifyPasswordDialogComponent', () => {
  let component: AdminModifyPasswordComponent;
  let fixture: ComponentFixture<AdminModifyPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminModifyPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminModifyPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
