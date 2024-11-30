import { Component } from '@angular/core';
import { FlowerMoodComponent } from '../trackers/flower-mood/flower-mood.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FlowerMoodComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
