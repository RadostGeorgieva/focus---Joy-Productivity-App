import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { UserService } from './user.service';
import { from, Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap, take, map } from 'rxjs/operators';
import { LowerCasePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WaterService {

  private collectionName = 'WaterData';
  private uid: string | null = null;
  private waterSubject = new BehaviorSubject<any[]>([]);  

  constructor(
    private firebaseService: FirebaseService,
    private userService: UserService,
  ) {
  }

  getUID(): Observable<string | null> {
    return from(this.userService.getCurrentUserId());
  }

  async addWaterData(waterData: { date: Date, loggedWater: number, goalWater:number }): Promise<void> {
    this.userService.getCurrentUserId().subscribe({
      next: (uid) => {
        if (uid)
          this.firebaseService.addOrUpdateInernalData("UsersData", uid, waterData, this.collectionName)
        return;
      },
    });

  }
  setData(data: any[]): void {
    this.waterSubject.next(data);  
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
