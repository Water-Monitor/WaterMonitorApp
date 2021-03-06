import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class NavigatorService {
    constructor(
        private router: Router,
    ) { }

    toHomePage() {
        this.router.navigate(["home"]);
    }

    toLoginPage() {
        this.router.navigate(["login"]);
    }

    toContactPage() {
        this.router.navigate(["contact"]);
    }

    toAboutPage() {
        this.router.navigate(["about"]);
    }

    toProfilePage() {
        this.router.navigate(["profile"]);
    }

    toSignupPage()
    {
        this.router.navigate(["register"]);
    }

    toWaterUsagePage() {
        this.router.navigate(["todays-water-usage"]);
    }
}