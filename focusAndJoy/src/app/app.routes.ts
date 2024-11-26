import { Routes } from '@angular/router';
import { ToDoComponent } from './to-do/to-do.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'to-do', component: ToDoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

];