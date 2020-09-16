import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewsDetailsComponent } from './admin-news-details.component';

describe('AdminNewsDetailsComponent', () => {
  let component: AdminNewsDetailsComponent;
  let fixture: ComponentFixture<AdminNewsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNewsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
