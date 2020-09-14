import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewsComponent } from './admin-news.component';

describe('AdminNewsComponent', () => {
  let component: AdminNewsComponent;
  let fixture: ComponentFixture<AdminNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
