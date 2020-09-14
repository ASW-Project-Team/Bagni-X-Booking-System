import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMainAppbarComponent } from './admin-main-appbar.component';

describe('CustomerMainAppbarComponent', () => {
  let component: AdminMainAppbarComponent;
  let fixture: ComponentFixture<AdminMainAppbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMainAppbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMainAppbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
