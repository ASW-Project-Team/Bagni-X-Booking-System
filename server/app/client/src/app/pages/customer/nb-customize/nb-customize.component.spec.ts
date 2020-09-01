import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NbCustomizeComponent } from './nb-customize.component';

describe('NbCustomizeComponent', () => {
  let component: NbCustomizeComponent;
  let fixture: ComponentFixture<NbCustomizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NbCustomizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NbCustomizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
