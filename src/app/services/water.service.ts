import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { UserService } from './user.service';
import { from, Observable, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WaterService {

  private collectionName = 'WaterData';
  private uid: string | null = null;
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
          this.firebaseService.addDocument("UsersData", uid, waterData, this.collectionName)
        return;
      },
    });

  }
}
