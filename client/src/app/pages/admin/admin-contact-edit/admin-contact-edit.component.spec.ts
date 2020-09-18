import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContactEditComponent } from './admin-contact-edit.component';

describe('AdminEditContactComponent', () => {
  let component: AdminContactEditComponent;
  let fixture: ComponentFixture<AdminContactEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminContactEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminContactEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
