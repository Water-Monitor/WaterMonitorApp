import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../models/auth/login';
import { Role } from '../models/auth/role';
import { NavigatorService } from './navigator.service';
import { PopUpService } from './pop-up.service';
import { UserService } from './user.service';
import { Storage } from '@ionic/storage';
import { Token } from 'src/models/auth/token';
import { User } from 'src/models/auth/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private static HAS_LOGGED_IN = "HAS_LOGGED_IN";
  private authState: any;

  constructor(
    private storage: Storage,
    private userService: UserService,
    private http: HttpClient,
    private popUpService: PopUpService,
    private navigatorService: NavigatorService,
  ) {
    this.authState = new BehaviorSubject(false);

    this.storage.get(AuthenticationService.HAS_LOGGED_IN).then((response) => {
      this.authState.next(response);
      console.log("hasLoggedIn: " + response);
      console.log("authStateValue: " + this.authState.value);
      console.log("isAuthenticated: " + this.isAuthenticated());
    });
  }

  async login(login: Login) {
    // this.popUpService.presentLoading().then(() => {
    console.info(environment.login_endpoint);
    this.http.post<any>(environment.login_endpoint, login)
      .pipe(response => {
        console.info("login response received: " + JSON.stringify(response));
        // this.popUpService.dismissLoading();
        return response;
      })
      .subscribe((token) => {
        let saveToken = new Token(token["Authorization"]);
        console.log("Token: " + JSON.stringify(saveToken));
        this.storage.set(environment.token, saveToken).then(() => {
          this.userService.getLoggedInUser().subscribe((user) => {
            if (user != null && user.id > 0) {
              this.storage.set(AuthenticationService.HAS_LOGGED_IN, true).then(() => {
                this.authState.next(true);
                this.navigatorService.toHomePage();

                console.log("User: " + JSON.stringify(user));
                this.userService.setLoggedInUserInCache(user);
              });
            }
            else {
              this.popUpService.presentAlert(`Inlogpoging mislukt`, `De combinatie gebruikersnaam en wachtwoord is onjuist`);
            }
          });
        });
      });
  }

  async logout() {
    console.info("Logging out");
    await this.storage.set(AuthenticationService.HAS_LOGGED_IN, null);
    await this.storage.set(environment.token, null);
    await this.userService.setLoggedInUserInCache(new User(-1, "", "", []));
    this.authState.next(false);
    this.navigatorService.toLoginPage();
  }

  // signup(signUp: SignUp) {
  //   return this.storage.set(AuthenticationService.HAS_LOGGED_IN, true).then(() => {
  //     let user = new User(signUp.username, null); //Add roles
  //     this.userService.setLoggedInUser(user);
  //   });
  // }

  isAuthenticated(): boolean {
    console.log("Authstate is: " + this.authState.getValue());
    return this.authState.getValue();
  }

  getLoggedInUser(): any {
    if (this.isAuthenticated()) {
      let user = this.userService.getLoggedInUserFromCache();
      console.log("loggedinuser: " + user.name);
      return user;
    }
    else {
      return null;
    }
  }

  isAdmin(): boolean {
    return this.getLoggedInUser().roles.find((t: Role) => t == Role.Admin) != null
  }
}