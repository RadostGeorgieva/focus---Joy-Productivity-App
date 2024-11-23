import { Component } from '@angular/core';
import { ToDoComponent } from '../to-do/to-do.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ToDoComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
