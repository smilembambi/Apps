import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTransactionHeaderComponent } from './main-transaction-header.component';

describe('MainTransactionHeaderComponent', () => {
  let component: MainTransactionHeaderComponent;
  let fixture: ComponentFixture<MainTransactionHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainTransactionHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainTransactionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
