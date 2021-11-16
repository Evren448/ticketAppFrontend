import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Route } from '../models/route-model';
import { AuthService } from './auth.service';
import { RequestBaseService } from './request-base.service';

const API_URL = `${environment.BASE_URL}/api/route`;


@Injectable({
  providedIn: 'root'
})
export class RouteService extends RequestBaseService{

  constructor(authService: AuthService, http: HttpClient) {
    super(authService,http);
  }

  saveRoute(route: Route): Observable<any> {
    return this.http.post(`${API_URL}/add`, route, {headers: this.getHeaders});
  }

  updateRoute(route : Route) : Observable<any>{
    return this.http.put(`${API_URL}/update`,route, {headers: this.getHeaders});

  }

  deleteRoute(route: Route): Observable<any> {
    return this.http.delete( `${API_URL}/delete/${route.id}`, {headers: this.getHeaders});
  }

  getAllRoutes() : Observable<any> {
    return this.http.get(`${API_URL}/getAll`, {headers: this.getHeaders});
    
  }

  findRouteById(id : Number): Observable<any> {
    return this.http.get(`${API_URL}/getRouteById/${id}`, {headers: this.getHeaders});

  }
}
