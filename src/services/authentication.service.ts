import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../models/auth/login';
import { Role } from '../models/auth/role';
import { User } from '../models/auth/user';
import { NavigatorService } from './navigator.service';
import { PopUpService } from './pop-up.service';
import { UserService } from './user.service';
import { Storage } from '@ionic/storage';
import { Token } from '@angular/compiler/src/ml_parser/lexer';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private static HAS_LOGGED_IN = "HAS_LOGGED_IN";
  private static TOKEN = "TOKEN";
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
console.info("HALLO");
    this.http.post<Token>(environment.login_endpoint, login)
      .pipe(response => {
        console.info("login response received: " + JSON.stringify(response));
        // this.popUpService.dismissLoading();
        return response;
      })
      .subscribe((token) => {
        //Mock user
          let user = new User(1, "Kees", "kaas", [Role.User]);
          if (user != null && user.id > 0) {
            this.storage.set(AuthenticationService.TOKEN, token).then(() => {
              console.log(JSON.stringify(token));

              this.storage.set(AuthenticationService.HAS_LOGGED_IN, true).then(() => {
              console.log(JSON.stringify(user));
              this.userService.setLoggedInUser(user);
              this.authState.next(true);
              this.navigatorService.toHomePage();
            });
          });
        }
        else {
          this.popUpService.presentAlert(`Inlogpoging mislukt`, `De combinatie gebruikersnaam en wachtwoord is onjuist`);
        }
      });
    // });

    // this.storage.set(AuthenticationService.HAS_LOGGED_IN, true).then(() => {
    //   let user = new User(1, "Kees", "kaas", [Role.User]);
    //   console.log(JSON.stringify(user));
    //   this.userService.setLoggedInUser(user);
    //   this.authState.next(true);
    //   this.navigatorService.toHomePage();
    // });
  }

  async logout() {
    console.info("Logging out");
    await this.storage.remove(AuthenticationService.HAS_LOGGED_IN);
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
      let user = this.userService.getLoggedInUser();
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