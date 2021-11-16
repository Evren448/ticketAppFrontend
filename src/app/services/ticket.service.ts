import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { RequestBaseService } from './request-base.service';

const API_URL = `${environment.BASE_URL}/api/ticket`


@Injectable({
  providedIn: 'root'
})
export class TicketService extends RequestBaseService{

  constructor(authService: AuthService, http: HttpClient) {
    super(authService,http);
  }

  getAllTickets() : Observable<any> {
    return this.http.get(`${API_URL}/getTickets`, {headers: this.getHeaders});
    
  }
}
