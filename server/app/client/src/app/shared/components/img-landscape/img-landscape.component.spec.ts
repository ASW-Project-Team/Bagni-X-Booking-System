import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgLandscapeComponent } from './img-landscape.component';

describe('ImgLandscapeComponent', () => {
  let component: ImgLandscapeComponent;
  let fixture: ComponentFixture<ImgLandscapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgLandscapeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgLandscapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
