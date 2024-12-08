import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { UserService } from './user.service';
import { from, Observable, of } from 'rxjs';
import { switchMap, take, map,tap } from 'rxjs/operators';
import { StepsData } from '../models/stepsData.model';

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
    return this.userService.getCurrentUserId().pipe(
      tap(uid => console.log("UID after logout:", uid))
    );
  }

  async addStepsData(StepsData: StepsData): Promise<void> {
    this.userService.getCurrentUserId().subscribe({
      next: (uid) => {
        if (uid){
          console.log("addStepsData");
          this.firebaseService.addOrUpdateInernalData("UsersData", uid, StepsData, this.collectionName)
        }
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
