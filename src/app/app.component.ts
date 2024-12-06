import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FirebaseService } from './services/firebase.service';
import { ToDoList } from './models/to-do.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { TaskModalComponent } from './productivity-hub/task-modal/task-modal.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskModalComponent, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'focusAndJoy';
  isLoggedIn: boolean = false;
  username: string = "Joy";
  isDropdownVisible: boolean = false;


  private clickListener!: (event: MouseEvent) => void;

  constructor(
    private firebaseService: FirebaseService,
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router
    
  ) {}

  ngOnInit(): void {
    this.clickListener = (event: MouseEvent) => this.closeDropdown(event);
    window.addEventListener('click', this.clickListener);

    this.userService.getCurrentUser().subscribe(user => {
      this.isLoggedIn = !!user;  
    });

  }

  logout(): void {
    this.userService.logout();  
    this.isLoggedIn = false; 
  }
  toggleDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  closeDropdown(event: MouseEvent): void {
    const profileElement = document.querySelector('.profile');
    if (profileElement && !profileElement.contains(event.target as Node)) {
      this.isDropdownVisible = false;
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('click', this.clickListener);
  }
}