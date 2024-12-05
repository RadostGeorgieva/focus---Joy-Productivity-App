import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { FirebaseService } from './services/firebase.service';
import { DocumentData } from 'firebase/firestore';
import { CommonModule } from '@angular/common';
import { ToDoComponent } from './to-do/to-do.component';
import { ToDoItem, ToDoList } from './models/to-do.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToDoService } from './services/to-do.service';  // Import your ToDoItem model
import { SleepService } from './services/sleep-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'focusAndJoy';
  data: ToDoList[] = [];
  toDoLists: ToDoList[] = [];
  isLoggedIn: boolean = false;

  username: string = "Joy"
  isDropdownVisible: boolean = false;


  constructor(
    private firebaseService: FirebaseService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.firebaseService.listenToToDoCollection('to-do-lists').subscribe((data) => {
      this.toDoLists = data;
      window.addEventListener('click', (event) => this.closeDropdown(event));
    });

    this.afAuth.authState.subscribe(user => {
      this.isLoggedIn = !!user;})
  }
  
  logout(): void {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/home']);
    }).catch(error => {
      console.error('Logout error:', error);
    });
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

  ngOnDestroy() {
    window.removeEventListener('click', (event) => this.closeDropdown(event));
  }
}
