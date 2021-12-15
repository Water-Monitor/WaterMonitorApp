import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/auth/user';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private static LOGGED_IN_USER = "LOGGED_IN_USER";
  private static USERS = "USERS";
  private loggedInUser: User;

  constructor(
    private http: HttpClient,
    private storage: Storage,
  ) { 
    this.loggedInUser = new User(-1, "", "", []);
    this.loggedInUser = this.getLoggedInUserFromCache();
    this.storage.get(UserService.LOGGED_IN_USER).then((loggedInUser: User) => this.loggedInUser = loggedInUser);
  }

  setLoggedInUserInCache(user: User) {
    this.storage.set(UserService.LOGGED_IN_USER, user);
    this.loggedInUser = user;
    console.log("User setted: " + user.name);
  }

  getLoggedInUserFromCache(): User {
    console.log("User getted: " + this.loggedInUser.name);
    return this.loggedInUser;
  }

  getLoggedInUser(): Observable<User> {
    return new Observable((observer) => {
      console.info("getLoggedInUser request");
      this.http.get<any>(environment.get_logged_in_user_endpoint)
        .pipe(
          map(response => {
            console.info("getLoggedInUser data received: " + JSON.stringify(response));
            let result = response['data'];
            return result;
          }),
          catchError(() => { console.error("ERROR getLoggedInUser"); return []; })
        ).subscribe((result) => {
          observer.next(result);
        });

    });
  }
}
