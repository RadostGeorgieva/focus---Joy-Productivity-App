import { Component } from '@angular/core';
import { ToDoLoggedInComponent } from './to-DoLoggedInUsers/to-do-logged-in/to-do-logged-in.component';
import { CalendarComponent } from './calendar/calendar.component';
import { RemindersComponent } from './reminders/reminders.component';

@Component({
  selector: 'app-productivity-hub',
  standalone: true,
  imports: [ToDoLoggedInComponent, CalendarComponent, RemindersComponent],
  templateUrl: './productivity-hub.component.html',
  styleUrl: './productivity-hub.component.css'
})
export class ProductivityHubComponent {
  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
