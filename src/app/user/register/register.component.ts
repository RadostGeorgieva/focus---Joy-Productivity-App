import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  email: string = '';
  password: string = '';
  username: string = '';
  passwordError: string = '';
  emailError: string = '';
  currentUser: any;


  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      this.currentUser = user;
    });
  }

  registerUser(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const { email,password } = this.registerForm.value;
    this.userService.registerUser({ email, password}).subscribe({
      next: () => {
        this.registerForm.reset();
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['/home']);
          }
        });
      },
      error: (err) => {
        console.error('Registration failed:', err);
      }
    })
  }

    hasError(controlName: string, errorName: string): boolean {
      const control = this.registerForm.get(controlName);
      return control ? control.hasError(errorName) && control.touched : false;
    }
  }
