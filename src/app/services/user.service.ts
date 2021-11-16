import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user-model';
import { AuthService } from './auth.service';
import { RequestBaseService } from './request-base.service';

const API_URL = `${environment.BASE_URL}/api/admin`

@Injectable({
  providedIn: 'root'
})
export class UserService extends RequestBaseService{

  currentUser: User = new User;

  constructor(authService: AuthService, http: HttpClient) {
    super(authService,http);
  }

  getAllUsers() : Observable<any> {
    return this.http.get(`${API_URL}/getUsers`, {headers: this.getHeaders});
  }

}
