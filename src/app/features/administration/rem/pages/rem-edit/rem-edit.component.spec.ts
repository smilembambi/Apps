import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemEditComponent } from './rem-edit.component';

describe('RemEditComponent', () => {
  let component: RemEditComponent;
  let fixture: ComponentFixture<RemEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
