import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainInputEmailComponent } from './main-input-email.component';

describe('MainInputEmailComponent', () => {
  let component: MainInputEmailComponent;
  let fixture: ComponentFixture<MainInputEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainInputEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainInputEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
