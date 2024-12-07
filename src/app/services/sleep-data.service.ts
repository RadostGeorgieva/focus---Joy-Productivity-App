import { Firestore } from '@angular/fire/firestore';
import { SleepData } from '../models/sleep-data.model';
import { FirebaseService } from './firebase.service';
import { UserService } from './user.service';
import { from, Observable, BehaviorSubject, firstValueFrom, of } from 'rxjs';
import { switchMap, take, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
import { LoginComponent } from '../user/login/login.component';
import { Timestamp } from '@angular/fire/firestore';


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

  async editSleepData(sleepData: SleepData, id:string): Promise<void> {
    let uid = await firstValueFrom(this.getUID());
    if (uid) {

      const updatedItem = {
        date: sleepData.date,
        dreams: sleepData.dreams,
        startTime: sleepData.startTime,
        endTime: sleepData.endTime,
        sleepQuality: sleepData.sleepQuality,
      };

      try {
        await this.firebaseService.addDocument('UsersData', uid, updatedItem, this.collectionName)
        console.log("testaeditSleepData");
      } catch (err) {
        console.error("Error updating sleep data:", err);
      }
    }
  }

  async addSleepData(sleepData: SleepData): Promise<void> {
    this.userService.getCurrentUserId().subscribe({
      next: (uid) => {
        if (uid){
          console.log("testaddHours");
          this.firebaseService.addDocument("UsersData", uid, sleepData, this.collectionName)
        return;
        }
      },
    });

  }

  async addHours(date:Date, hours:number) {
    this.userService.getCurrentUserId().subscribe({
      next: (uid) => {
        if (uid)   {
          console.log("testaddHours");
          this.firebaseService.addDocument("UsersData", uid, {date,hours}, this.collectionName)
          return;
        }    
         
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