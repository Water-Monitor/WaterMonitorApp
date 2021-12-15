import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { NavigatorService } from './navigator.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    public authService: AuthenticationService,
    private navService: NavigatorService,
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let loggedInUser = this.authService.getLoggedInUser();
    /*console.log("loggedinuser canActivate: " + loggedInUser.name);*/

    if (loggedInUser != null) {
      console.info("roles: " + loggedInUser.roles[0]);
      // check if route is restricted by role
      if (route.data.roles && route.data.roles.indexOf(loggedInUser.roles[0]) === -1) {
        // role not authorised so redirect to home page
        this.navService.toHomePage();
        console.info("Authenticated but not allowed");
        return false;
      }

      // authorised so return true
      console.info("Authenticated");
      return true;
    }

    this.navService.toLoginPage();
    console.info("Not authenticated");
    return false;
  }
}
