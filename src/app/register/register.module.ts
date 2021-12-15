import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartistModule } from 'ng-chartist';
import { RegisterComponent } from './register.component';
import { RegisterRoutes } from './register.routing';
import { MaterialComponentsModule } from '../material-component/material.module';
import {ReactiveFormsModule, FormsModule}from '@angular/forms';





@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    ChartistModule,
    MaterialComponentsModule,
    ReactiveFormsModule,
    RouterModule.forChild(RegisterRoutes),
    FormsModule



  ],
  declarations: [RegisterComponent]
})
export class RegisterModule { }
