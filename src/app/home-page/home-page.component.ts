import { Component } from '@angular/core';

import { MoodComponent } from '../trackers/mood/mood.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MoodComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
