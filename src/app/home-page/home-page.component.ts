import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor(private userService: UserService) {
  }
  user: null | String = null;
  ngOnInit(): void {
    this.userService.getCurrentUserId().subscribe((userId) => {
      this.user = userId;
    });
  }
}