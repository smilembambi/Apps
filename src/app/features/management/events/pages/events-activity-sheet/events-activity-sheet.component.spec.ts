import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsActivitySheetComponent } from './events-activity-sheet.component';

describe('EventsActivitySheetComponent', () => {
  let component: EventsActivitySheetComponent;
  let fixture: ComponentFixture<EventsActivitySheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsActivitySheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsActivitySheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
