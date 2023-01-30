import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainChipsComponent } from './main-chips.component';

describe('MainChipsComponent', () => {
  let component: MainChipsComponent;
  let fixture: ComponentFixture<MainChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainChipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
