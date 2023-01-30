import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChurchLocationComponent } from './church-location.component';

describe('ChurchLocationComponent', () => {
  let component: ChurchLocationComponent;
  let fixture: ComponentFixture<ChurchLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChurchLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChurchLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
