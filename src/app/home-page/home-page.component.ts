import { Component } from '@angular/core';
import { ToDoComponent } from '../to-do/to-do.component';
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
