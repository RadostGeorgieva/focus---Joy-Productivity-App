import { Component } from '@angular/core';
import { FlowerMoodComponent } from '../trackers/flower-mood/flower-mood.component';

import { SleepComponent } from '../trackers/sleep/sleep.component';
import { WaterComponent } from '../trackers/water/water.component';
import { StepsComponent } from '../trackers/steps/steps.component';
import { CaloriesComponent } from '../trackers/calories/calories.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FlowerMoodComponent,  SleepComponent, WaterComponent, StepsComponent, CaloriesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
