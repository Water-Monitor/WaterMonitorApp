import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';
import { NavigatorService } from '../../services/navigator.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private navService: NavigatorService
  ) { }

  ngOnInit() {
    this.authService.logout();
    this.navService.toLoginPage();
  }

}
