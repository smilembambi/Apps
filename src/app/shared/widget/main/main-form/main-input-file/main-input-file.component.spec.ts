import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainInputFileComponent } from './main-input-file.component';

describe('MainInputFileComponent', () => {
  let component: MainInputFileComponent;
  let fixture: ComponentFixture<MainInputFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainInputFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainInputFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
