import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user-model';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user : User = new User();
  errorMessage : string = "";

  constructor(private auth$ : AuthService, private router : Router, private alertify$ : AlertifyService) { }

  ngOnInit(): void {
  }

  register() {
    this.auth$.register(this.user).subscribe(data => {
      //this.alertify$.success("Basariyla kayit olundu.");
      this.router.navigate(['/login']);
    }, err => {
      if (err?.status === 409) {
        this.errorMessage = 'Username already exist.';
      } else {
        this.errorMessage = 'Unexpected error occurred. Error is: ' + err?.errorMessage;
        //this.alertify$.error("Kayit sirasinda bir hata olustu");
        console.log(err);
      }
    })
  }
}
