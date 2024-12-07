import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Reminder } from '../models/reminder.model';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  private reminders: Reminder[] = []; 

  constructor() { }


  addReminder(reminder: Reminder): Observable<Reminder> {
    this.reminders.push(reminder); 
    console.log('Reminder added:', reminder);
    return of(reminder); 
  }


  getReminders(): Observable<Reminder[]> {
    return of(this.reminders);
  }

  
  removeReminder(reminderId: string): Observable<void> {
    this.reminders = this.reminders.filter(rem => rem.id !== reminderId);
    console.log('Reminder removed:', reminderId);
    return of();
  }
}
