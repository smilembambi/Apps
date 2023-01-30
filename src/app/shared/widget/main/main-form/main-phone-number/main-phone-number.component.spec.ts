import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPhoneNumberComponent } from './main-phone-number.component';

describe('MainPhoneNumberComponent', () => {
  let component: MainPhoneNumberComponent;
  let fixture: ComponentFixture<MainPhoneNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPhoneNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPhoneNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
