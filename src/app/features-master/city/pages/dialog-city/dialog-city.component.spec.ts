import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCityComponent } from './dialog-city.component';

describe('DialogCityComponent', () => {
  let component: DialogCityComponent;
  let fixture: ComponentFixture<DialogCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
