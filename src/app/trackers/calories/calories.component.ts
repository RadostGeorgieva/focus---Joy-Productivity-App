import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CaloriesService } from '../../services/calories.service';
import { CaloriesData } from '../../models/calories-data.model';

@Component({
  selector: 'app-calories',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './calories.component.html',
  styleUrl: './calories.component.css'
})
export class CaloriesComponent implements OnInit {
  caloriesData: CaloriesData = { date: new Date(), loggedCalories: 0, goalCalories: 0 };
  week = [
    { day: 'Monday', adding: false, editing: false, date: new Date(), loggedCalories: 0, goalCalories: 10000, inputAmount: 0 },
    { day: 'Tuesday', adding: false, editing: false, date: null, loggedCalories: 0, goalCalories: 10000, inputAmount: 0 },
    { day: 'Wednesday', adding: false, editing: false, date: null, loggedCalories: 0, goalCalories: 10000, inputAmount: 0 },
    { day: 'Thursday', adding: false, editing: false, date: null, loggedCalories: 0, goalCalories: 10000, inputAmount: 0 },
    { day: 'Friday', adding: false, editing: false, date: null, loggedCalories: 0, goalCalories: 10000, inputAmount: 0 },
    { day: 'Saturday', adding: false, editing: false, date: null, loggedCalories: 0, goalCalories: 10000, inputAmount: 0 },
    { day: 'Sunday', adding: false, editing: false, date: null, loggedCalories: 0, goalCalories: 10000, inputAmount: 0 }
  ];

  inputAmount: number = 0;
  constructor(private CaloriesService: CaloriesService) { }
  ngOnInit(): void {
    this.calculateCurrentWeekDates();
    this.loadCaloriesData()
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
  loadCaloriesData(): void {
    this.CaloriesService.getCollectionData().subscribe({
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
              day.loggedCalories = matchingData.data.loggedCalories;
              day.goalCalories = matchingData.data.goalCalories

              console.log(matchingData.data.loggedCalories);
              console.log(matchingData.data.goalCalories);
            }
          }
        });
      },
      error: (error) => {
        console.error('Error loading Calories data:', error);
      }
    });
  }

  toggleInput(day: any): void {

    if (day.adding) {
      day.loggedCalories += day.inputAmount;
      day.inputAmount = 0;

      const CaloriesData = {
        date: day.date,
        loggedCalories: day.loggedCalories,
        goalCalories: day.goalCalories
      }
      this.addCalories(CaloriesData);
    }
    day.adding = !day.adding;

  }
  toggleEdit(day: any): void {
    day.editing = !day.editing;
    if (day.loggedCalories < 0) {
      day.goalCalories = 0;
    }
    const CaloriesData = {
      date: day.date,
      loggedCalories: day.loggedCalories,
      goalCalories: day.goalCalories
    }
    this.addCalories(CaloriesData);
  }

  addCalories(CaloriesData: { date: Date, loggedCalories: number, goalCalories: number }) {
    this.CaloriesService.addCaloriesData(CaloriesData)
  }

}

