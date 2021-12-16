import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartistModule } from 'ng-chartist';
import { TodaysWaterUsageComponent } from './todays-water-usage.component';
import { TodaysWaterUsageRoutes } from './todays-water-usage.routing';
import { TipOfTheDayComponent } from './todays-water-usage-components/tip-of-the-day/tip-of-the-day.component';
import { TodaysWaterUsageGraphComponent } from './todays-water-usage-components/todays-water-usage-graph/todays-water-usage-graph.component';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    ChartistModule,
    RouterModule.forChild(TodaysWaterUsageRoutes)
  ],
  declarations: [TodaysWaterUsageComponent, TipOfTheDayComponent, TodaysWaterUsageGraphComponent]
})
export class TodaysWaterUsageModule { }
