import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeHttpService } from 'src/app/providers/employee-http-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signinForm: FormGroup;
  formError = "";
  submitted = false;


  constructor(fb: FormBuilder, private service: EmployeeHttpService, private router: Router) {
    this.signinForm = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.signinForm.valid && this.confirmPassword?.value === this.password?.value) {
      this.service.postSignUp({
        nom: this.firstName?.value,
        prenom: this.lastName?.value,
        email: this.email?.value,
        password: this.password?.value
      }).subscribe({
        next: () => {
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.formError = err.error.message;
        }
      })
    }
  }

  get username() {
    return this.signinForm.get('username');
  }

  get firstName() {
    return this.signinForm.get('firstName');
  }
  get lastName() {
    return this.signinForm.get('lastName');
  }
  get email() {
    return this.signinForm.get('email');
  }
  get password() {
    return this.signinForm.get('password');
  }
  get confirmPassword() {
    return this.signinForm.get('confirmPassword');
  }

}
