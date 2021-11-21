import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/models/role-model';
import { User } from 'src/app/models/user-model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  currentUser: User = new User();
  pageControl: number = 0;

  constructor(private auth$: AuthService) {}

  ngOnInit(): void {
    this.auth$.currentUser.subscribe((data) => {
      this.currentUser = data;
    });
  }

  isAdmin() {
    return this.currentUser?.role === Role.ADMIN;
  }

  paging(control: number) {
    if (control > 2 && control < -1) {
      this.pageControl = -1;
    }
    this.pageControl = control;
  }
}
