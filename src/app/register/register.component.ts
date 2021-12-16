import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'], providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private _activatedRoute: ActivatedRoute,
    private _router: Router) {

    this.registerForm = this.formBuilder.group({
      username: new FormControl(null, [Validators.required, Validators.maxLength(21), Validators.pattern('^[a-zA-Z]+$')]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(21)]),
      confirmpassword: new FormControl(null, [Validators.required, Validators.maxLength(21)]),
      email: new FormControl(null, [Validators.required, Validators.maxLength(40), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    },
      {
        validators: this.MustMatch('password', 'confirmpassword')
      })
  }


  get f() { return this.registerForm.controls; }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.MustMatch) {
        return
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ MustMatch: true })
      }
      else {
        matchingControl.setErrors(null);
      }

    }

  }
  onBackbuttonClick(): void {
    this._router.navigate(['/login']);
  }

  ngOnInit() { }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
  }
}