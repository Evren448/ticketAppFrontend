import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Status } from '../models/status-enum';
import { Ticket } from '../models/ticket-model';
import { User } from '../models/user-model';
import { Vehicle } from '../models/vehicle-model';
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

  // saveTicket(vehicle : Vehicle ,ticket: Ticket): Observable<any> {
  //   return this.http.post(`${API_URL}/add`, ticket, {headers: this.getHeaders});
  // }

  //http://localhost:8080/api/ticket/getTicketsByStatus?status=TAKEN
  getAllTicketsByStatus(status : Status) : Observable<any> {
    return this.http.get(`${API_URL}/getTicketsByStatus?status=${status}`, {headers: this.getHeaders});
    
  }

  //findAllByStatusAndVehicle_VehicleDateAndRoute_BeginAndRoute_End
  //http://localhost:8080/api/ticket/findAllByStatusAndVehicle_VehicleDateAndRoute_BeginAndRoute_End?begin=Ankara&end=Eskisehir&status=DELAYED&vehicleDate=2021-11-20
  getAllTicketsByStatusAndDateAndBeginAndEnd(status : Status, date : Date, begin : string, end : string) : Observable<any> {
    return this.http.get(`${API_URL}/findAllByStatusAndVehicle_VehicleDateAndRoute_BeginAndRoute_End?begin=${begin}&end=${end}&status=${status}&vehicleDate=${date}`, {headers: this.getHeaders});
    
  }

  //findAllByStatusAndVehicle_VehicleDateAndRoute_BeginAndRoute_EndAndUser_Id
  //http://localhost:8080/api/ticket/findAllByStatusAndVehicle_VehicleDateAndRoute_BeginAndRoute_EndAndUser_Id?begin=Ankara&end=Eskisehir&id=5&status=CANCALLED&vehicleDate=2021-11-20
  getAllTicketsByStatusAndDateAndBeginAndEndAndUserId(status : Status, date : Date, begin : string, end : string, user: User) : Observable<any> {
    return this.http.get(`${API_URL}/findAllByStatusAndVehicle_VehicleDateAndRoute_BeginAndRoute_EndAndUser_Id?begin=${begin}&end=${end}&id=${user.id}&status=${status}&vehicleDate=${date}`, {headers: this.getHeaders});
    
  }
  
}
