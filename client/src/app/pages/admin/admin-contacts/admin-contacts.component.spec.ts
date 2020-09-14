import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContactsComponent } from './admin-contacts.component';

describe('AdminContactsComponent', () => {
  let component: AdminContactsComponent;
  let fixture: ComponentFixture<AdminContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminContactsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
