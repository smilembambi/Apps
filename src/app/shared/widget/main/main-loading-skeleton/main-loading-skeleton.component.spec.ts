import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLoadingSkeletonComponent } from './main-loading-skeleton.component';

describe('MainLoadingSkeletonComponent', () => {
  let component: MainLoadingSkeletonComponent;
  let fixture: ComponentFixture<MainLoadingSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainLoadingSkeletonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainLoadingSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
