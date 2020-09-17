import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpStatusIndicatorComponent } from './http-status-indicator.component';

describe('HttpStatusIndicatorComponent', () => {
  let component: HttpStatusIndicatorComponent;
  let fixture: ComponentFixture<HttpStatusIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpStatusIndicatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpStatusIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
