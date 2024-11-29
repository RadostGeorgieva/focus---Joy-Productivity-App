import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { FirestoreCheckService } from './services/firestore-check.service';
import { FirebaseService } from './services/firebase.service';
import { DocumentData } from 'firebase/firestore';
import { CommonModule } from '@angular/common';
import { ToDoComponent } from './to-do/to-do.component';
import { ToDoItem, ToDoList } from './models/to-do.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToDoService } from './services/to-do.service';  // Import your ToDoItem model

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



  constructor(
    private firestoreCheckService: FirestoreCheckService,
    private firebaseService: FirebaseService,
    private toDoService: ToDoService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.firebaseService.listenToCollection('to-do-lists').subscribe((data) => {
      this.toDoLists = data;
    });

    this.afAuth.authState.subscribe(user => {
      this.isLoggedIn = !!user;})
  }
  
  logout(): void {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/home']); // Redirect to home after logout
    }).catch(error => {
      console.error('Logout error:', error);
    });
  }
}