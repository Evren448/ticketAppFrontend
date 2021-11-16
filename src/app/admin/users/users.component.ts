import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user-model';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';
import { AdminComponent } from '../admin/admin.component';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userList: Array<User> = [];
  selectedUser: User = new User();
  errorMessage: string = '';

  constructor(private adminService : AdminService) { }

  @ViewChild(ModalComponent) child: ModalComponent | undefined;
  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe((data) => {
      this.userList = data;
    });
  }

  findAllUsers(): any {
    this.adminService.getAllUsers().subscribe(
      (data) => {
        this.userList = data;
      },
      (err) => {
        this.errorMessage = 'Unexpected error';
        console.log(err);
      }
    );
  }

  createUserRequest() {
    this.selectedUser = new User();
    this.child?.showSaveUserModal();
  }

  editUserRequest(item: User) {
    this.selectedUser = Object.assign({}, item);
    this.child?.showUpdateUserModal();
  }

  saveUserWatcher(user: User) {
    let itemIndex = this.userList.findIndex((item) => item.id === user.id);
    if (itemIndex !== -1) {
      this.userList[itemIndex] = user;
    } else {
      this.userList.push(user);
    }
  }

  deleteUser(item: User, ind: number) {
    this.adminService.deleteUser(item).subscribe(
      (data) => {
        this.userList.splice(ind, 1);
      },
      (err) => {
        this.errorMessage = 'Admin kullanicilar silinemez.';
        console.log(err);
      }
    );
  }

}
