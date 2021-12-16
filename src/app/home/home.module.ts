import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './home.component';
import { HomeRoutes } from './home.routing';
import { ChartistModule } from 'ng-chartist';

@NgModule({
    imports: [
      CommonModule,
      DemoMaterialModule,
      FlexLayoutModule,
      ChartistModule,
      RouterModule.forChild(HomeRoutes)
    ],
    declarations: [HomeComponent]
  })
  export class HomeModule {}
  