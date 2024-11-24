import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { FirestoreCheckService } from './services/firestore-check.service';
import { FirebaseService } from './services/firebase.service';
import { DocumentData } from 'firebase/firestore';
import { CommonModule } from '@angular/common';
import { ToDoComponent } from './to-do/to-do.component';
import { ToDoItem, ToDoList } from './models/to-do.model';
import { ToDoService } from './services/to-do.service';  // Import your ToDoItem model

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomePageComponent, ToDoComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'focusAndJoy';
  data: ToDoList[] = [];
  toDoLists: ToDoList[] = []; // Type the data as ToDoItem[] to match the fetched data

  constructor(
    private firestoreCheckService: FirestoreCheckService,
    private firebaseService: FirebaseService,
    private toDoService: ToDoService
  ) {}

  ngOnInit(): void {
    this.firebaseService.listenToCollection('to-do-lists').subscribe((data) => {
      this.toDoLists = data;
    });
  }
}