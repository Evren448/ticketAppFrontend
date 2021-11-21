import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user-model';
import { AdminService } from 'src/app/services/admin.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

declare var $: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  errorMessage : string = "";
  currentUser : User = new User();
    
  roleList: any = ['ADMIN', 'USER']
  @Input() user: User = new User();
  @Output() save = new EventEmitter<any>();

  constructor(private authService :AuthService, private adminService : AdminService, private router : Router, private alertifyService : AlertifyService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
  }

  saveUser() {

    this.adminService.saveUser(this.user).subscribe(data => {
      this.save.emit(data);
      $("#userSaveModal").modal("hide");
      this.alertifyService.success("Kullanici kaydedildi.");
    }, err => {
      if (err?.status === 409) {
        this.errorMessage = 'Username already exist.';
        this.alertifyService.warning("Kullanici zaten kayitli.");
      }
      else {
        this.errorMessage = err.error;
        this.alertifyService.warning(this.errorMessage);
        //console.log(err);
      }
      
    })
  }

  updateUser() {

    this.adminService.updateUser(this.user).subscribe(data => {
      this.save.emit(data);
      $("#userUpdateModal").modal("hide");
      this.alertifyService.success("Kullanici guncellendi.");
      if (data.role === 'USER' && data.id === this.authService.currentUserValue?.id){
        this.authService.logOut();
        this.router.navigate(['/login']);
        this.alertifyService.warning("Bu sayfaya artik erisim hakkiniz yok.");
      }
    }, err => {
      if (err?.status === 409) {
        this.errorMessage = 'Username already exist.';
        this.alertifyService.warning("Kullanici adi daha onceden alinmis.");
      } else {
        this.errorMessage = err.error;
        this.alertifyService.warning(this.errorMessage);
        console.log(err);
      }
    })
  }

  closeSaveModal(){
    $("#userSaveModal").modal("hide");
  }

  closeUpdateModal(){
    $("#userUpdateModal").modal("hide");
  }

  showSaveUserModal(){
    $("#userSaveModal").modal("show");
  }

  showUpdateUserModal(){
    $("#userUpdateModal").modal("show");
  }

}
