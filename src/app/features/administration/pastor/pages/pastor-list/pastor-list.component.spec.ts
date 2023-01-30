import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastorListComponent } from './pastor-list.component';

describe('PastorListComponent', () => {
  let component: PastorListComponent;
  let fixture: ComponentFixture<PastorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastorListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
