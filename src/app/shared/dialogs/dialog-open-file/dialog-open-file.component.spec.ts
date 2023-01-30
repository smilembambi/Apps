import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOpenFileComponent } from './dialog-open-file.component';

describe('DialogOpenFileComponent', () => {
  let component: DialogOpenFileComponent;
  let fixture: ComponentFixture<DialogOpenFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogOpenFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOpenFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
