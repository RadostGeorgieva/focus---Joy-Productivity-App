import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SleepService } from '../../services/sleep-data.service';
import { from, Subscription } from 'rxjs';


@Component({
  selector: 'app-sleep',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sleep.component.html',
  styleUrl: './sleep.component.css'
})

export class SleepComponent implements OnInit {

  sleepData: any[] = []
  times: number[] = [];
  startTime: number = 0;
  endTime: number = 0;
  selectedDate: Date = new Date()
  dreams: string = "";
  sleepQuality: number = 0;
  hours: number = 0;
  addingSleepLog: boolean = false;
  hasLog: boolean = false;
  weekDays: { date: Date, label: string, hours: number}[] = [];
  private dataSubscription: Subscription = new Subscription();

  constructor(private sleepService: SleepService) { }

  ngOnInit(): void {
    this.loadSleepData();
    this.calculateCurrentWeekDates();
  }

  loadSleepData(): void {
    this.sleepService.getCollectionData().subscribe({
      next: (data) => {
        this.sleepData = data;
        this.loadLogsForWeek()
      },
      error: (error) => {
        console.error('Error loading sleep data:', error);
      }
    })
    for (let i = 0; i < 24; i++) {
      this.times.push(i);
    }

  }
  calculateCurrentWeekDates() {
    const today = new Date();
    let startOfWeek = new Date();
    startOfWeek.setDate(today.getDate() - (today.getDay() + 6) % 7);
    startOfWeek.setHours(0, 0, 0, 0);

    this.weekDays = [];
    for (let i = 0; i < 7; i++) {
      const weekDay = new Date(startOfWeek);
      weekDay.setDate(startOfWeek.getDate() + i);
      this.weekDays.push({
        date: new Date(weekDay),
        label: weekDay.toLocaleDateString('en-US', { weekday: 'short' }),
        hours: 0
      });
    }

  }

  addLog(sleepQuality: number, dreams: string, startTime: number, endTime: number) {

    const data = {
      date: this.selectedDate,
      dreams: this.dreams,
      startTime: this.startTime,
      endTime: this.endTime,
      sleepQuality: this.sleepQuality,
      hours: this.hours
    };

    this.sleepService.addSleepData(data)
    this.addingSleepLog = false;

    this.dreams = ""
    this.startTime = 0;
    this.endTime = 0;
    this.sleepQuality = 0;
    this.hasLog = false;

  }
  editLog(sleepQuality: number, dreams: string, startTime: number, endTime: number) {

    const data = {
      date: this.selectedDate,
      dreams: this.dreams,
      startTime: this.startTime,
      endTime: this.endTime,
      sleepQuality: this.sleepQuality,
      hours: this.hours
    };
    this.sleepService.addSleepData(data)
    this.addingSleepLog = false;
    this.dreams = ""
    this.startTime = 0;
    this.endTime = 0;
    this.sleepQuality = 0;
 
    this.hasLog = false;
  }
  showSleepLogForm(date: Date) {
    this.addingSleepLog = !this.addingSleepLog;
    console.log(this.weekDays);
    
    this.selectedDate = date;
      for(let day of this.weekDays) {
      if (date == day.date && day.hours!=0)  {
          this.hasLog = true;
          return;
        }
      }
  }

  loadLogsForWeek(): void {
    this.weekDays.forEach((day) => {
      for (let logDate of this.sleepData) {
        const date = new Date(logDate.data.date.seconds * 1000);
        if (
          date.getFullYear() === day.date.getFullYear() &&
          date.getMonth() === day.date.getMonth() &&
          date.getDate() === day.date.getDate()
        ) {
          day.hours = logDate.data.hours
          
        }
      }
    });

    console.log(this.weekDays);
  }
  hoursSlept(event: MouseEvent) {

    const currentElement = event.target as HTMLElement;
    const hours: string | null = currentElement.getAttribute('data-hour');
    this.hours = Number(hours);

    this.resetColor(Number(hours), currentElement);
    let previousElement = currentElement.previousElementSibling;

    currentElement.style.backgroundColor = 'blue';
    while (previousElement) {
      let item = previousElement as HTMLElement
      item.style.backgroundColor = 'blue';
      previousElement = previousElement.previousElementSibling;
    }
  }

  resetColor(hours: number, currentElement: HTMLElement) {

    for (let i = 1; i <= 17; i++) {
      const parentElement = currentElement.closest('.day');
      if (parentElement) {
        Array.from(parentElement.children).forEach((child, index) => {
          const circle = child as HTMLElement;
          circle.style.backgroundColor = '#ADD8E6';
          if (child.tagName.toLowerCase() === 'button') {
            const button = child as HTMLElement;
            button.style.backgroundColor = 'blue';
          }
        });

      }
    }
  }
}