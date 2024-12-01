import { Firestore } from '@angular/fire/firestore';
import { SleepData } from '../models/sleep-data.model';
import { FirebaseService } from './firebase.service';
import { UserService } from './user.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' 
})
export class SleepService {

    private collectionName = 'SleepData';
    private sleepSubject = new BehaviorSubject<any[]>([]);
    constructor(
        private firebaseService: FirebaseService,
        private userService: UserService,
    ) { }


    async addSleepData( date: Date, dreams: string, hoursSlept: number, sleepQuality: number): Promise<void> {

        const userId = this.userService.getCurrentUserId();
        const sleepData = { date, dreams, hoursSlept, sleepQuality }
        return this.firebaseService.addDocument(this.collectionName, sleepData)
    }
    
    getCollectionData():Observable<any[]> {
        return this.firebaseService.listenToCollection(this.collectionName); 
      }
    
    
      fetchData() {
        this.firebaseService.listenToCollection(this.collectionName).subscribe(data => {
          this.sleepSubject.next(data); 
        });
      }
    
}