import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysWaterUsageComponent } from './todays-water-usage.component';

describe('TodaysWaterUsageComponent', () => {
  let component: TodaysWaterUsageComponent;
  let fixture: ComponentFixture<TodaysWaterUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodaysWaterUsageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysWaterUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
