import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRankDetailsComponent } from './admin-rank-details.component';

describe('AdminRankDetailsComponent', () => {
  let component: AdminRankDetailsComponent;
  let fixture: ComponentFixture<AdminRankDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRankDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRankDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
