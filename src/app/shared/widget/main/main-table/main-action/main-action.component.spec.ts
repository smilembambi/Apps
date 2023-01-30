import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainActionComponent } from './main-action.component';

describe('MainActionComponent', () => {
  let component: MainActionComponent;
  let fixture: ComponentFixture<MainActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
