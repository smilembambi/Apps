import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainViewInfoComponent } from './main-view-info.component';

describe('MainViewInfoComponent', () => {
  let component: MainViewInfoComponent;
  let fixture: ComponentFixture<MainViewInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainViewInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainViewInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
