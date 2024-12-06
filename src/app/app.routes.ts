import { Routes } from '@angular/router';
import { ToDoComponent } from './to-do/to-do.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductivityHubComponent } from './productivity-hub/productivity-hub.component';
import { AuthGuard } from './guards/guards/auth.guard';
import { NoAuthGuard } from './guards/guards/no-auth.guard';



export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] }, 
  { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard] },
  { path: 'trackers', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'productivity', component: ProductivityHubComponent, canActivate: [AuthGuard] },
  { path: 'to-do', component: ToDoComponent, canActivate: [NoAuthGuard] },
  { path: '**', redirectTo: 'home' }, 

];