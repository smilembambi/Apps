import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsPresenceComponent } from './events-presence.component';

describe('EventsPresenceComponent', () => {
  let component: EventsPresenceComponent;
  let fixture: ComponentFixture<EventsPresenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsPresenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsPresenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
