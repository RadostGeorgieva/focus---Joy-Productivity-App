import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../../services/user.service';  // Adjust the import path if necessary

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.userService.isLoggedIn().pipe(
      map((isLoggedIn) => {
        if (isLoggedIn) {
          this.router.navigate(['/dashboard'])
          return false; 
        }
        return true; 
      })
    );
  }
}
