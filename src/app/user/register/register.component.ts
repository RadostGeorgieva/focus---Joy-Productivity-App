import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  email: string = "";
  password: string = "";
  currentUser: any;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private router: Router) { }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      this.currentUser = user;
    })
  }

  registerUser(user: { email: string, password: string }) {
    this.userService.registerUser(user).subscribe({
      next: (response) => {
        this.email = '';
        this.password = '';
        this.afAuth.authState.subscribe(user => {

          if (user) {
            this.router.navigate(['/home']); //
          }
        });
      },
    });
  }
}