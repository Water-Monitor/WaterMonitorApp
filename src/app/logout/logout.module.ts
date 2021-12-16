import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartistModule } from 'ng-chartist';
import { LogoutComponent } from './logout.component';
import { LogoutRoutes } from './logout.routing-module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    ChartistModule,
    RouterModule.forChild(LogoutRoutes)
  ],
  declarations: [LogoutComponent]
})
export class LogoutModule {}
