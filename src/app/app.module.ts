
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AdminRoutes, AppRoutes, UserRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import { IonicStorageModule } from '@ionic/storage';
import { AuthenticationService } from 'src/services/authentication.service';
import { AuthIntercepter } from 'src/services/auth-intercepter';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    SharedModule,
    [RouterModule.forRoot(AppRoutes), RouterModule.forRoot(UserRoutes), RouterModule.forRoot(AdminRoutes)],
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    AuthenticationService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthIntercepter,
        multi: true
    },
    [DatePipe]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
