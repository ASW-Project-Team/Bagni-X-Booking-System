import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomeCustomizeComponent } from './admin-home-customize.component';

describe('AdminHomeCustomizeComponent', () => {
  let component: AdminHomeCustomizeComponent;
  let fixture: ComponentFixture<AdminHomeCustomizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminHomeCustomizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHomeCustomizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
