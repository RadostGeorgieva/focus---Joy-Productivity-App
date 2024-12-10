import { Component } from '@angular/core';
import { ToDoLoggedInComponent } from './to-DoLoggedInUsers/to-do-logged-in/to-do-logged-in.component';

@Component({
  selector: 'app-productivity-hub',
  standalone: true,
  imports: [ToDoLoggedInComponent],
  templateUrl: './productivity-hub.component.html',
  styleUrl: './productivity-hub.component.css'
})
export class ProductivityHubComponent {
  isSidebarCollapsed = false;


}
