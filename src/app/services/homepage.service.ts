import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.BASE_URL}/api/homepage`


@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  constructor(private http : HttpClient) { }

  getAllVehicles() : Observable<any> {
    return this.http.get(`${API_URL}/getAll`);
    
  }

  
}
