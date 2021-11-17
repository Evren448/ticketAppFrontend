import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket-model';
import { User } from 'src/app/models/user-model';
import { Vehicle } from 'src/app/models/vehicle-model';
import { AuthService } from 'src/app/services/auth.service';
import { HomepageService } from 'src/app/services/homepage.service';
import { TicketService } from 'src/app/services/ticket.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  vehicleList: Array<Vehicle> = [];
  user : User = new User();
  //selectedVehicle: Vehicle = new Vehicle();
  errorMessage: string = '';
  constructor(private authService : AuthService, private homePageService : HomepageService, private ticketService : TicketService) { }

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    this.homePageService.getAllVehicles().subscribe((data) => {
      this.vehicleList = data;
    });
  }

  buyTicket(vehicle : Vehicle, ind: number){
    
  
  }
  

}
