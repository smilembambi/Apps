import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainInputNumberComponent } from './main-input-number.component';

describe('MainInputNumberComponent', () => {
  let component: MainInputNumberComponent;
  let fixture: ComponentFixture<MainInputNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainInputNumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainInputNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
