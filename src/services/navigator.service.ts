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
        this.router.navigate(['/']);
    }

    toLoginPage() {
        this.router.navigate(["login"]);
    }
    toSignupPage()
    {
        this.router.navigate(["register"])
    }
}