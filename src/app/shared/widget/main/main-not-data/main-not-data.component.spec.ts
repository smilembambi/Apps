import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNotDataComponent } from './main-not-data.component';

describe('MainNotDataComponent', () => {
  let component: MainNotDataComponent;
  let fixture: ComponentFixture<MainNotDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainNotDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNotDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
