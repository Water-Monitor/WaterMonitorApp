import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { NavigatorService } from 'src/services/navigator.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public authService: AuthenticationService,
    private navService: NavigatorService
  ) { }

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
}

