import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChurchEditComponent } from './church-edit.component';

describe('ChurchEditComponent', () => {
  let component: ChurchEditComponent;
  let fixture: ComponentFixture<ChurchEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChurchEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChurchEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
