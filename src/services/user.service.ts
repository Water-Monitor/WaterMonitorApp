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
    this.loggedInUser = this.getLoggedInUser();
    this.storage.get(UserService.LOGGED_IN_USER).then((loggedInUser: User) => this.loggedInUser = loggedInUser);
  }

  setLoggedInUser(user: User) {
    this.storage.set(UserService.LOGGED_IN_USER, user);
    this.loggedInUser = user;
    console.log("User setted: " + user.name);
  }

  getLoggedInUser(): User {
    console.log("User getted: " + this.loggedInUser.name);
    return this.loggedInUser;
  }

  getUsers(): Observable<User[]> {
    return new Observable((observer) => {
      this.storage.get(UserService.USERS).then((data: User[]) => {
        if (data) {
          console.info("Get users from cache");
          console.info(JSON.stringify(data));
          observer.next(data);
        } else {
          console.info("Get users request");
          this.http.get<any>(environment.get_users_endpoint)
            .pipe(
              map(response => {
                console.info("Get users data received: " + JSON.stringify(response));
                let result: User[] = response['objects'];
                this.storage.set(UserService.USERS, result);
                return result;
              }),
              catchError(() => { console.error("ERROR getUsers"); return []; })
            ).subscribe((result) => { observer.next(result); });
        }
      });
    });
  }
}
