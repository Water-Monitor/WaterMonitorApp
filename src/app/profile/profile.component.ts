import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    //private accountService: AccountService,
    //private alertService: AlertService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(21)], Validators.pattern(' ^([A-Za-z])\w+ ')],
      email: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(21), Validators.pattern(' ^/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi ')]],
      age: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(' ^([1-9][0-9]|[0-9]) ')]],
      size: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(' /[^a-z ]\ *([.0-9])*\d/g ')]],
      city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(21), Validators.pattern(' ^([A-Za-z])\w+ ')]],
      country: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(21), Validators.pattern(' ^([A-Za-z])\w+ ')]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);

    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      console.log("triggered");
      return;
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