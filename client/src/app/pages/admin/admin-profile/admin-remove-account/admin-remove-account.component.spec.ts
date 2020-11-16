import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRemoveAccountComponent } from './admin-remove-account.component';

describe('AdminRemoveAccountComponent', () => {
  let component: AdminRemoveAccountComponent;
  let fixture: ComponentFixture<AdminRemoveAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRemoveAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRemoveAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
