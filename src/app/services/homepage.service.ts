import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ticket } from '../models/ticket-model';
import { Vehicle } from '../models/vehicle-model';
import { AuthService } from './auth.service';
import { RequestBaseService } from './request-base.service';

const API_URL = `${environment.BASE_URL}/api/homepage`


@Injectable({
  providedIn: 'root'
})
export class HomepageService extends RequestBaseService{

  constructor(authService: AuthService, http: HttpClient) {
    super(authService,http);
  }
  getAllVehicles() : Observable<any> {
    return this.http.get(`${API_URL}/getAll`);
    
  }

  saveTicket(ticket: Ticket): Observable<any> {
      return this.http.post(`${API_URL}/buyTicket`, ticket, {headers: this.getHeaders});
    }
}
