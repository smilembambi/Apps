import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAutoCompleteComponent } from './main-auto-complete.component';

describe('MainAutoCompleteComponent', () => {
  let component: MainAutoCompleteComponent;
  let fixture: ComponentFixture<MainAutoCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainAutoCompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
