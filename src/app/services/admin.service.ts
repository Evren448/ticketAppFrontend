import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user-model';
import { AuthService } from './auth.service';
import { RequestBaseService } from './request-base.service';

const API_URL = `${environment.BASE_URL}/api/admin`;

@Injectable({
  providedIn: 'root'
})
export class AdminService extends RequestBaseService {

  constructor(authService: AuthService, http: HttpClient) {
    super(authService,http);
  }

  saveUser(user: User): Observable<any> {
    return this.http.post(`${API_URL}/add`, user, {headers: this.getHeaders});
  }

  updateUser(user : User) : Observable<any>{
    return this.http.put(`${API_URL}/update`,user, {headers: this.getHeaders});

  }

  deleteUser(user: User): Observable<any> {
    return this.http.delete( `${API_URL}/delete/${user.id}`, {headers: this.getHeaders});
  }

  getAllUsers() : Observable<any> {
    return this.http.get(`${API_URL}/getUsers`, {headers: this.getHeaders});
    
  }

  findUserById(id : Number): Observable<any> {
    return this.http.get(`${API_URL}/getUser/${id}`, {headers: this.getHeaders});

  }
}
