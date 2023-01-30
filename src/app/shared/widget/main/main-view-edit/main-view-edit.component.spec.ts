import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainViewEditComponent } from './main-view-edit.component';

describe('MainViewEditComponent', () => {
  let component: MainViewEditComponent;
  let fixture: ComponentFixture<MainViewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainViewEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
