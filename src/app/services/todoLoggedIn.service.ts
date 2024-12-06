import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { UserService } from './user.service';
import { ToDoLoggedIn, Task } from '../models/to-do.model';
import { from, Observable, of, map } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ToDoLoggedInService {
  private collectionName = 'ToDoListsData'; // Collection name in Firebase
  private uid: string | null = null;

  constructor(
    private firebaseService: FirebaseService,
    private userService: UserService
  ) {}


  getUID(): Observable<string | null> {
    return from(this.userService.getCurrentUserId());
  }


  async addToDoList(toDoList: ToDoLoggedIn): Promise<void> {
    this.userService.getCurrentUserId().subscribe({
      next: (uid) => {
        if (uid) {
          this.firebaseService.addDocument(
            'UsersData',
            uid,
            toDoList,
            this.collectionName
          );
        }
      },
      error: (err) => console.error('Error fetching user ID:', err),
    });
  }


  getToDoLists(): Observable<ToDoLoggedIn[]> {
    return this.getUID().pipe(
      switchMap((uid) => {
        if (uid) {
          return this.firebaseService.listenToCollection(
            'UsersData',
            uid,
            this.collectionName
          ).pipe(
            map((data) => {
              return data.map(doc => ({
                ...doc.data,
                tasks: doc.data?.tasks ?? [],
                category: doc.data?.category || 'daily'
              }));
            })
          );
        } else {
            
          console.log('UID not found');
          return of([]);
        }
      })
    );
  }
}