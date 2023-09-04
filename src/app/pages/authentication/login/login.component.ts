import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeHttpService } from 'src/app/providers/employee-http-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  signinForm: FormGroup;
  formError = "";
  submitted = false;


  constructor(fb: FormBuilder, private service: EmployeeHttpService, private router:Router) {
    this.signinForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.signinForm.valid) {
      this.service.postLogin({
        email:this.email?.value,
        password:this.password?.value
      }).subscribe({
        next: () => {
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['todoList']);
        },
        error: (err) => {
          this.formError = err.error.message;
        }
      })
    }
  }

  get email() {
    return this.signinForm.get('email');
  }

  get password() {
    return this.signinForm.get('password');
  }

}
