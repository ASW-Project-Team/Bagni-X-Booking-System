import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesSelectorComponent } from './sales-selector.component';

describe('SalesSelectorComponent', () => {
  let component: SalesSelectorComponent;
  let fixture: ComponentFixture<SalesSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
