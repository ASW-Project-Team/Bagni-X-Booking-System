import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAppbarComponent } from './main-appbar.component';

describe('AppbarComponent', () => {
  let component: MainAppbarComponent;
  let fixture: ComponentFixture<MainAppbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainAppbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainAppbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
