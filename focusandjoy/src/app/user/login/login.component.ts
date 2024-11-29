import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = "";
  password: string = "";

  constructor(private userService: UserService,
    private afAuth: AngularFireAuth) { }

  loginUser(user: { email: string, password: string }) {
    this.userService.loginUser(user).subscribe({
      next: (response) => {
        this.email = '';
        this.password = '';
        this.afAuth.authState.subscribe(user => {
          if (user) {
            console.log('User logged in:', user);
          } else {
            console.log('No user logged in');
          }
        });
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }
}