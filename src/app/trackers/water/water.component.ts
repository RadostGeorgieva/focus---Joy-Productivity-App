import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WaterService } from '../../services/water.service';

@Component({
  selector: 'app-water',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './water.component.html',
  styleUrl: './water.component.css'
})
export class WaterComponent {

  week = [
    { day: 'Monday', adding: false, editing:false, date: new Date, loggedWater: 0, goalWater: 2000, inputAmount: 0 },
    { day: 'Tuesday', adding: false, editing:false,date: null, loggedWater: 0, goalWater: 2000, inputAmount: 0 },
    { day: 'Wednesday', adding: false, editing:false,date: null, loggedWater: 0, goalWater: 2000, inputAmount: 0 },
    { day: 'Thursday', adding: false, editing:false,date: null, loggedWater: 0, goalWater: 2000, inputAmount: 0 },
    { day: 'Friday', adding: false, editing:false,date: null, loggedWater: 0, goalWater: 2000, inputAmount: 0 },
    { day: 'Saturday', adding: false, editing:false,date: null, loggedWater: 0, goalWater: 2000, inputAmount: 0 },
    { day: 'Sunday', adding: false, editing:false,date: null, loggedWater: 0, goalWater: 2000, inputAmount: 0 }
  ];

  inputAmount: number = 0;
  constructor(private waterService: WaterService) { }
  
  toggleInput(day: any): void {

    if (day.adding) {
      day.loggedWater += day.inputAmount;
      day.inputAmount = 0;
    }
    day.adding = !day.adding;

  }
  toggleEdit(day: any): void {  
    console.log('Before editing toggle:', day.editing);
    day.editing = !day.editing;
    console.log('After editing toggle:', day.editing);
    if (!day.editing) {
      if (day.loggedWater < 0) {
        day.loggedWater = 0; 
      }
    }
  }

}

