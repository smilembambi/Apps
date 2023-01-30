import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainViewZoneComponent } from './main-view-zone.component';

describe('MainViewZoneComponent', () => {
  let component: MainViewZoneComponent;
  let fixture: ComponentFixture<MainViewZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainViewZoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainViewZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
