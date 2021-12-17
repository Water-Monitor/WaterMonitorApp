import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';
import { NavigatorService } from 'src/services/navigator.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public authService: AuthenticationService,
    private navService: NavigatorService

   
  ) { }

  ngOnInit(): void {
  }
  onLogin() {
    this.navService.toLoginPage();
  }

  async onLogout() {
    this.authService.logout();
  }

  onContact() {
    this.navService.toContactPage();
  }

  onHome() {
    this.navService.toHomePage();
  }

  onAbout() {
    this.navService.toAboutPage();
  }

  onProfile() {
    this.navService.toProfilePage();
  }

  onSettings() {
    console.warn("Settings page is not implemented yet");
  }

  onWaterUsage() {
    this.navService.toWaterUsagePage();
  }

}
