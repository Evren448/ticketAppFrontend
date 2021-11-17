import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ticket } from '../models/ticket-model';
import { User } from '../models/user-model';
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

  getUserTickets(user : User): Observable<any> {
    return this.http.get(`${API_URL}/getTicketsByUserId/${user.id}` , {headers: this.getHeaders});
  }

  deleteTicket(ticket: Ticket): Observable<any> {
    return this.http.delete( `${API_URL}/delete/${ticket.id}`, {headers: this.getHeaders});
  }

  updateTicket(ticket: Ticket): Observable<any> {
    return this.http.put( `${API_URL}/update`, ticket, {headers: this.getHeaders});
  }

  saveTicket(ticket: Ticket): Observable<any> {
    return this.http.post(`${API_URL}/add`, ticket, {headers: this.getHeaders});
  }
}
