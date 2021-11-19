import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';

//import { AccountService, AlertService } from '@app/_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    yform!: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        //public form: null,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        //private accountService: AccountService,
        //private alertService: AlertService
    ) { }

    ngOnInit() {
        this.yform = this.formBuilder.group({
            username: ['', Validators.required, Validators.pattern(' ^[a-z0-9_-]$ '), Validators.minLength(8), Validators.maxLength(21)],
            password: ['', Validators.required, Validators.pattern(' ^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).$ '), 
            Validators.minLength(8), Validators.maxLength(21)]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.yform.controls; }

    onSubmit() {
        //this.submitted = true;
        console.log(this.yform.value);

        // reset alerts on submit
       // this.alertService.clear();

        // stop here if form is invalid
        if (this.yform.invalid) {
          console.log("triggered");
            //return;
        }

        this.loading = true;
        /*this.accountService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    // get return url from query parameters or default to home page
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigateByUrl(returnUrl);
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });*/
    }
}