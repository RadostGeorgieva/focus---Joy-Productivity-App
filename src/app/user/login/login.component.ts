import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  loginUser() {
    if (this.loginForm.invalid) {
      return;
    }
  
    const { email, password } = this.loginForm.value;
  
    this.userService.loginUser({ email, password }).subscribe((response) => {
      if (response?.error) {
        const errorCode = response.error.code;
        switch (errorCode) {
          case 'auth/user-not-found':
            this.errorMessage = 'Email not registered';
            break;
          case 'auth/wrong-password':
            this.errorMessage = 'Incorrect password';
            break;
          case 'auth/invalid-email':
            this.errorMessage = 'Invalid email address';
            break;
            case 'auth/invalid-credential':
              this.errorMessage = 'The supplied credentials are invalid or expired';
              break;
          default:
            this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
      } else {
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['/trackers']);
          }
        });
      }
    });
  }
  hasError(controlName: string, errorName: string): boolean {
    return this.loginForm.get(controlName)?.hasError(errorName) ?? false;
  }
}
