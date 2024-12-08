import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StepsService } from '../../services/steps.service';
import { StepsData } from '../../models/stepsData.model';

@Component({
  selector: 'app-steps',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './steps.component.html',
  styleUrl: './steps.component.css'
})
export class StepsComponent implements OnInit {
  stepsData: StepsData = { date: new Date(), loggedSteps: 0, goalSteps: 0 };
  week = [
    { day: 'Monday', adding: false, editing: false, date: new Date(), loggedSteps: 0, goalSteps: 10000, inputAmount: 0 },
    { day: 'Tuesday', adding: false, editing: false, date: null, loggedSteps: 0, goalSteps: 10000, inputAmount: 0 },
    { day: 'Wednesday', adding: false, editing: false, date: null, loggedSteps: 0, goalSteps: 10000, inputAmount: 0 },
    { day: 'Thursday', adding: false, editing: false, date: null, loggedSteps: 0, goalSteps: 10000, inputAmount: 0 },
    { day: 'Friday', adding: false, editing: false, date: null, loggedSteps: 0, goalSteps: 10000, inputAmount: 0 },
    { day: 'Saturday', adding: false, editing: false, date: null, loggedSteps: 0, goalSteps: 10000, inputAmount: 0 },
    { day: 'Sunday', adding: false, editing: false, date: null, loggedSteps: 0, goalSteps: 10000, inputAmount: 0 }
  ];

  inputAmount: number = 0;
  constructor(private stepsService: StepsService) { }
  ngOnInit(): void {
    this.calculateCurrentWeekDates();
    this.loadStepsData()
  }
  calculateCurrentWeekDates() {
    const today = new Date();
    let startOfWeek = new Date();
    startOfWeek.setDate(today.getDate() - (today.getDay() + 6) % 7);
    startOfWeek.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      const weekDay = new Date(startOfWeek);
      weekDay.setDate(startOfWeek.getDate() + i);
      this.week[i].date = new Date(weekDay);

    }
  }
  loadStepsData(): void {
    this.stepsService.getCollectionData().subscribe({
      next: (data) => {
        this.week.forEach(day => {
          if (day.date) {
            const dayDateOnly = day.date.toISOString().split('T')[0];
  
            const matchingData = data.find((entry: any) => {
              const entryDateString = new Date(entry.data.date.seconds *1000).toISOString()
              .split('T')[0] 
              return entryDateString === dayDateOnly;
            });

            if (matchingData) {
              day.loggedSteps = matchingData.data.loggedSteps;
              day.goalSteps = matchingData.data.goalSteps
            }
          }
        });
      },
      error: (error) => {
        console.error('Error loading steps data:', error);
      }
    });
  }

  toggleInput(day: any): void {

    if (day.adding) {
      day.loggedSteps += day.inputAmount;
      day.inputAmount = 0;

      const stepsData = {
        date: day.date,
        loggedSteps: day.loggedSteps,
        goalSteps: day.goalSteps
      }
      this.addSteps(stepsData);
    }
    day.adding = !day.adding;

  }
  toggleEdit(day: any): void {
    day.editing = !day.editing;
    if (day.loggedSteps < 0) {
      day.goalSteps = 0;
    }
    const stepsData = {
      date: day.date,
      loggedSteps: day.loggedSteps,
      goalSteps: day.goalSteps
    }
    this.addSteps(stepsData);
  }

  addSteps(stepsData: { date: Date, loggedSteps: number, goalSteps: number }) {
    this.stepsService.addStepsData(stepsData)
  }
  getProgressBarWidth(loggedSteps: number, goalSteps: number): string {
    return `${Math.min(loggedSteps / goalSteps, 1) * 100}%`;
  }

}

