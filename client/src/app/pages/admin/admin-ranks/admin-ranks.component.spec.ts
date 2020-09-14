import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRanksComponent } from './admin-ranks.component';

describe('AdminRanksComponent', () => {
  let component: AdminRanksComponent;
  let fixture: ComponentFixture<AdminRanksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRanksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
