import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from './models/role-model';
import { User } from './models/user-model';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Ticket-Angular';

  currentUser: User = new User();

  constructor(private authService: AuthService, private router: Router) {
    this.authService.currentUser.subscribe((data) => {
      this.currentUser = data;
    });
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

  isAdmin() {
    return this.currentUser?.role === Role.ADMIN;
  }

  isUser() {
    return this.currentUser?.role === Role.USER;
  }
}
