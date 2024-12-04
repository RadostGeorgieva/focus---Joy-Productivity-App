import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { UserService } from './user.service';
import { from, Observable, of } from 'rxjs';
import { switchMap, take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StepsService {

  private collectionName = 'StepsData';
  private uid: string | null = null;
  constructor(
    private firebaseService: FirebaseService,
    private userService: UserService,
  ) {
  }

  getUID(): Observable<string | null> {
    return from(this.userService.getCurrentUserId());
  }

  async addStepsData(StepsData: { date: Date, loggedSteps: number, goalSteps:number }): Promise<void> {
    this.userService.getCurrentUserId().subscribe({
      next: (uid) => {
        if (uid)
          this.firebaseService.addDocument("UsersData", uid, StepsData, this.collectionName)
        return;
      },
    });

  }

  getCollectionData(): Observable<any[]> {

    return this.getUID().pipe(
      switchMap((uid) => {
        if (uid) {
          return this.firebaseService.listenToCollection("UsersData", uid, this.collectionName);
        } else {
          console.log('UID not found');
          return of([]);
        }
      })
    );
  }
}
