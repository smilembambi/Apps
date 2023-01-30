import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainInputMaskComponent } from './main-input-mask.component';

describe('MainInputMaskComponent', () => {
  let component: MainInputMaskComponent;
  let fixture: ComponentFixture<MainInputMaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainInputMaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainInputMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
