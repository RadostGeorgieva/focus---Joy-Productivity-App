import { Firestore } from '@angular/fire/firestore';
import { SleepData } from '../models/sleep-data.model';
import { FirebaseService } from './firebase.service';
import { UserService } from './user.service';
import { from, Observable, BehaviorSubject, firstValueFrom, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
import { LoginComponent } from '../user/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class SleepService {

  private collectionName = 'SleepData';
  private sleepSubject = new BehaviorSubject<any[]>([]);
  private uid: string | null = null;
  constructor(
    private firebaseService: FirebaseService,
    private userService: UserService,
  ) {
  }


  async addSleepData(sleepData: { date: Date, dreams: string, startTime: number, endTime: number, sleepQuality: number, hours: number }): Promise<void> {
    this.userService.getCurrentUserId().subscribe({
      next: (uid) => {
        if (uid)
          this.firebaseService.addDocument("UsersData", uid, sleepData, this.collectionName)
        return;
      },
    });

  }
  getUID(): Observable<string | null> {
    return from(this.userService.getCurrentUserId());
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

fetchData() {

  this.firebaseService.listenToCollection("UsersData", this.uid, this.collectionName).subscribe(data => {
    this.sleepSubject.next(data);
  });
}

}