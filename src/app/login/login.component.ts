import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/services/authentication.service';
import { Login } from 'src/models/auth/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    lgnForm!: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthenticationService,
    ) { }

    ngOnInit() {
        this.lgnForm = this.formBuilder.group({
            username: ['', [Validators.required, 
                // Validators.pattern(' ^[a-z0-9_-]$ '), 
                Validators.minLength(5), Validators.maxLength(21)]],
            password: ['', [Validators.required, 
                // Validators.pattern(' ^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).$ '), 
            Validators.minLength(8), Validators.maxLength(200)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.lgnForm.controls; }

    onSubmit() {
        this.submitted = true;
        console.log(this.lgnForm.value);

        // reset alerts on submit
       // this.alertService.clear();

        // stop here if form is invalid
        if (this.lgnForm.invalid) {
          console.log("triggered");
            return;
        }

        console.log("hallo");
        this.loading = true;
        this.authService.login(new Login(this.f.username.value, this.f.password.value));
    }
}