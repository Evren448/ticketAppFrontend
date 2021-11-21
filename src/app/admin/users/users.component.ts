import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user-model';
import { AdminService } from 'src/app/services/admin.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { AdminComponent } from '../admin/admin.component';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  userList: Array<User> = [];
  selectedUser: User = new User();
  errorMessage: string = '';

  user: User = new User();

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private router: Router,
    private alertifyService: AlertifyService
  ) {}

  @ViewChild(ModalComponent) child: ModalComponent | undefined;
  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    this.adminService.getAllUsers().subscribe((data) => {
      this.userList = data;
      this.errorMessage = "";
    });
  }

  findAllUsers(): any {
    this.adminService.getAllUsers().subscribe(
      (data) => {
        this.userList = data;
        this.errorMessage = "";
      },
      (err) => {
        this.errorMessage = err.error;
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
    if (item.id === this.user.id) {
      this.errorMessage = 'Kendinizini silemezsiniz.';
    } else if (item.role === 'ADMIN') {
      this.errorMessage = 'Admin kullanicilar silinemez.';
    } else {
      this.adminService.deleteUser(item).subscribe(
        (data) => {
          this.userList.splice(ind, 1);
          this.errorMessage = "";
          this.alertifyService.success(
            item.fullname + ' adli kullanici silindi.'

          );
        },
        (err) => {
          this.errorMessage = err.error;
        }
      );
    }
  }
}
