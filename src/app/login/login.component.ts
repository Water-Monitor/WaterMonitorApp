import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Login } from '../../models/auth/login';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  login: Login = { username: '', password: '' };
  submitted = false;

  constructor(
    public authService: AuthenticationService,
  ) { }

  // async onLogin(form: NgForm) {
  //   this.submitted = true;

  //   if (form.valid) {
  //       this.authService.login(this.login);
  //   }
  // }

  async onLogin() {
    this.submitted = true;

    this.authService.login(this.login);
  }

  onSignup() {
    // this.router.navigateByUrl('/signup');
  }
}
