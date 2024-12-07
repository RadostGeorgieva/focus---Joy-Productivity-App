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
  private collectionName = 'ToDoListsData';
  private uid: string | null = null;

  constructor(
    private firebaseService: FirebaseService,
    private userService: UserService
  ) {}


  getUID(): Observable<string | null> {
    return from(this.userService.getCurrentUserId());
  }


  async addToDoList(toDoList: ToDoLoggedIn): Promise<void> {
    this.getUID().subscribe({
      next: (uid) => {
        if (uid) {
          console.log("addToDoList");
          
          this.firebaseService.addDocument(
            'UsersData',
            uid,
            toDoList,
            this.collectionName
          );
        } else {
          console.error('UID not found');
        }
      },
      error: (err) => {
        console.error('Error fetching user ID:', err);
      }
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
                id: doc.id, 
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
  deleteToDoList(listId: string): Observable<void> {
    return this.getUID().pipe(
      switchMap((uid) => {
        if (uid) {
          return from(
            this.firebaseService.delete('UsersData',uid, listId, this.collectionName)
          ).pipe(
            map(() => {
              console.log('ToDo list deleted successfully', listId);
              console.log('client', uid);
            })
          );
        } else {
          console.log('UID not found');
          return of(void 0);
        }
      })
    );
  }
}
  
