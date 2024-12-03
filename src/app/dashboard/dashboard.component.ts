import { Component } from '@angular/core';
import { FlowerMoodComponent } from '../trackers/flower-mood/flower-mood.component';
import { MoodComponent } from '../trackers/mood/mood.component';
import { SleepComponent } from '../trackers/sleep/sleep.component';
import { WaterComponent } from '../trackers/water/water.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FlowerMoodComponent,MoodComponent, SleepComponent, WaterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
