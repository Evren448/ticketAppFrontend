import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket-model';
import { User } from 'src/app/models/user-model';
import { Vehicle } from 'src/app/models/vehicle-model';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { HomepageService } from 'src/app/services/homepage.service';
import { TicketService } from 'src/app/services/ticket.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  begin: string = '';
  end: string = '';

  vehicleList: Array<Vehicle> = [];
  user: User = new User();
  //selectedVehicle: Vehicle = new Vehicle();
  errorMessage: string = '';
  ticket: Ticket = new Ticket();
  constructor(
    private authService: AuthService,
    private homePageService: HomepageService,
    private vehicleService: VehicleService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    this.homePageService.getAllVehicles().subscribe((data) => {
      this.vehicleList = data;
    });
  }

  buyTicket(vehicle: Vehicle, ind: number) {
    this.ticket.routeId = vehicle.routeId;
    this.ticket.routeStart = vehicle.beginPoint;
    this.ticket.routeEnd = vehicle.endPoint;
    this.ticket.vehicleId = vehicle.id;

    this.ticket.userId = this.user.id;

    this.homePageService.saveTicket(this.ticket).subscribe(
      (data) => {
        this.ngOnInit();
        this.alertifyService.success('Biletiniz alindi.');
      },
      (err) => {
        this.errorMessage = err.error;
        this.alertifyService.error(this.errorMessage);
        console.log(err);
      }
    );
  }
  clickme() {
    this.vehicleService.getAllVehiclesRoute(this.begin, this.end).subscribe(
      (data) => {
        this.vehicleList = data;
      },
      (err) => {
        this.errorMessage = err.error;
      }
    );
  }
}
