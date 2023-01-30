import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemListComponent } from './rem-list.component';

describe('RemListComponent', () => {
  let component: RemListComponent;
  let fixture: ComponentFixture<RemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
