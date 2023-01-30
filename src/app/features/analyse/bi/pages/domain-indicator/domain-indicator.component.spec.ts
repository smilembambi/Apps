import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainIndicatorComponent } from './domain-indicator.component';

describe('DomainIndicatorComponent', () => {
  let component: DomainIndicatorComponent;
  let fixture: ComponentFixture<DomainIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomainIndicatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DomainIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
