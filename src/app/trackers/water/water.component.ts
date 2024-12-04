import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WaterService } from '../../services/water.service';
import { WaterData } from '../../models/waterData.model';

@Component({
  selector: 'app-water',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './water.component.html',
  styleUrl: './water.component.css'
})
export class WaterComponent implements OnInit {
  waterData: WaterData = { date: new Date(), loggedWater: 0, goalWater: 0 };
  week = [
    { day: 'Monday', adding: false, editing: false, date: new Date(), loggedWater: 0, goalWater: 2000, inputAmount: 0 },
    { day: 'Tuesday', adding: false, editing: false, date: null, loggedWater: 0, goalWater: 2000, inputAmount: 0 },
    { day: 'Wednesday', adding: false, editing: false, date: null, loggedWater: 0, goalWater: 2000, inputAmount: 0 },
    { day: 'Thursday', adding: false, editing: false, date: null, loggedWater: 0, goalWater: 2000, inputAmount: 0 },
    { day: 'Friday', adding: false, editing: false, date: null, loggedWater: 0, goalWater: 2000, inputAmount: 0 },
    { day: 'Saturday', adding: false, editing: false, date: null, loggedWater: 0, goalWater: 2000, inputAmount: 0 },
    { day: 'Sunday', adding: false, editing: false, date: null, loggedWater: 0, goalWater: 2000, inputAmount: 0 }
  ];

  inputAmount: number = 0;
  constructor(private waterService: WaterService) { }
  ngOnInit(): void {
    this.calculateCurrentWeekDates();
    this.loadWaterData()
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
  loadWaterData(): void {
    this.waterService.getCollectionData().subscribe({
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
              day.loggedWater = matchingData.data.loggedWater;
              day.goalWater = matchingData.data.goalWater

              console.log(matchingData.data.loggedWater);
              console.log(matchingData.data.goalWater);
            }
          }
        });
      },
      error: (error) => {
        console.error('Error loading water data:', error);
      }
    });
  }

  toggleInput(day: any): void {

    if (day.adding) {
      day.loggedWater += day.inputAmount;
      day.inputAmount = 0;

      const waterData = {
        date: day.date,
        loggedWater: day.loggedWater,
        goalWater: day.goalWater
      }
      this.addWater(waterData);
    }
    day.adding = !day.adding;

  }
  toggleEdit(day: any): void {
    day.editing = !day.editing;
    if (day.loggedWater < 0) {
      day.loggedWater = 0;
    }
    const waterData = {
      date: day.date,
      loggedWater: day.loggedWater,
      goalWater: day.goalWater
    }
    this.addWater(waterData);
  }

  addWater(waterData: { date: Date, loggedWater: number, goalWater: number }) {
    this.waterService.addWaterData(waterData)
  }

}

