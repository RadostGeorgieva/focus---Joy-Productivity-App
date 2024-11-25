import { Routes } from '@angular/router';
import { ToDoComponent } from './to-do/to-do.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'to-do', component: ToDoComponent },

];