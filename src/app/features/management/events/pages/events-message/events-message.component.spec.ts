import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsMessageComponent } from './events-message.component';

describe('EventsMessageComponent', () => {
  let component: EventsMessageComponent;
  let fixture: ComponentFixture<EventsMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
