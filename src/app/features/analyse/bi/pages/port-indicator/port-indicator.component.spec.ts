import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortIndicatorComponent } from './port-indicator.component';

describe('PortIndicatorComponent', () => {
  let component: PortIndicatorComponent;
  let fixture: ComponentFixture<PortIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortIndicatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
