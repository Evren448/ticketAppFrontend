import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vehicle } from '../models/vehicle-model';
import { AuthService } from './auth.service';
import { RequestBaseService } from './request-base.service';

const API_URL = `${environment.BASE_URL}/api/vehicle`


@Injectable({
  providedIn: 'root'
})
export class VehicleService extends RequestBaseService{

  constructor(authService: AuthService, http: HttpClient) {
    super(authService,http);
  }

  saveVehicle(vehicle: Vehicle): Observable<any> {
    return this.http.post(`${API_URL}/add`, vehicle, {headers: this.getHeaders});
  }

  updateVehicle(vehicle : Vehicle) : Observable<any>{
    return this.http.put(`${API_URL}/update`,vehicle, {headers: this.getHeaders});

  }

  deleteVehicle(vehicle: Vehicle): Observable<any> {
    return this.http.delete( `${API_URL}/delete/${vehicle.id}`, {headers: this.getHeaders});
  }

  getAllVehicles() : Observable<any> {
    return this.http.get(`${API_URL}/getAll`, {headers: this.getHeaders});
    
  }

  findVehicleById(id : Number): Observable<any> {
    return this.http.get(`${API_URL}/get/${id}`, {headers: this.getHeaders});

  }
  //http://localhost:8080/api/vehicle/getStartEnd?begin=Izmir&end=Istanbul
  getAllVehiclesRoute(begin : string, end : string) : Observable<any> {
    return this.http.get(`${API_URL}/getStartEnd?begin=${begin}&&end=${end}`, {headers: this.getHeaders});
    
  }
}
