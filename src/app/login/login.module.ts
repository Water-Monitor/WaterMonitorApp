import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartistModule } from 'ng-chartist';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { LoginRoutes } from './login.routing-module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,    //import here
    ReactiveFormsModule, //import here
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    ChartistModule,
    RouterModule.forChild(LoginRoutes)
  ],
  declarations: [
    LoginComponent,
  ]
})
export class LoginModule { }
