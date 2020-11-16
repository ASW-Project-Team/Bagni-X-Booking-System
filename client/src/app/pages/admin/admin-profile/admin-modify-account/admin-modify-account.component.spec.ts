import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModifyAccountComponent } from './admin-modify-account.component';

describe('ModifyAccountComponent', () => {
  let component: AdminModifyAccountComponent;
  let fixture: ComponentFixture<AdminModifyAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminModifyAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminModifyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
