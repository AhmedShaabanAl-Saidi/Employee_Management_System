import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // global property
  isLoading: boolean = false;

  private readonly _Router = inject(Router);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^admin$/),
    ]),
  });

  SubmitLoginForm(): void {
    this.isLoading = true;

    setTimeout(() => {
      if (this.loginForm.valid) {
        // Save login status in localStorage
        localStorage.setItem('isLoggedIn', 'true');

        this._Router.navigate(['/home']);
      } else {
        this.loginForm.markAllAsTouched();
      }
      this.isLoading = false;
    }, 2000);
  }
}
