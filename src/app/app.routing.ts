import { Routes } from '@angular/router';
import { Role } from 'src/models/auth/role';
import { AuthGuardService } from 'src/services/auth-guard.service';

import { FullComponent } from './layouts/full/full.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/todays-water-usage',
        pathMatch: 'full'
      },
            {
        path: 'register',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'logout',
        loadChildren: () => import('./logout/logout.module').then( m => m.LogoutModule)
      },
      
      {
        path : 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path : 'contact',
        loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
      },
      {
        path : 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
      },
    ]
  }
];

export const UserRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuardService],
    data: { roles: [Role.User, Role.Admin] },
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'todays-water-usage',
        loadChildren: () => import('./todays-water-usage/todays-water-usage.module').then(m => m.TodaysWaterUsageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then( m => m.ProfileModule)
      },
    ]
  }
];

export const AdminRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuardService],
    data: { roles: [Role.Admin] },
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardModule)
      },
    ]
  }
];
