import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user-model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user : User = new User();
  errorMessage : string = "";

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
    // if (this.authService.currentUserValue?.id) {
    //   this.router.navigate(['/home']);
    //   return;
    // }
  }

  login() {
    this.authService.login(this.user).subscribe(data => {
      this.router.navigate(['/home']);
    }, err => {
      this.errorMessage = 'Username or password is incorrect.';
      console.log(err);
    })
  }

}
