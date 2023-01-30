import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDateComponent } from './main-date.component';

describe('MainDateComponent', () => {
  let component: MainDateComponent;
  let fixture: ComponentFixture<MainDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
