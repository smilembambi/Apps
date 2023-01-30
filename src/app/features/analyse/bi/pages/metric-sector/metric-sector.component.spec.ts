import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricSectorComponent } from './metric-sector.component';

describe('MetricSectorComponent', () => {
  let component: MetricSectorComponent;
  let fixture: ComponentFixture<MetricSectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetricSectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetricSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
