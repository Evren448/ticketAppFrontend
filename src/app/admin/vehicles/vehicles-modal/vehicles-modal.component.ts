import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Route } from 'src/app/models/route-model';
import { Vehicle } from 'src/app/models/vehicle-model';
import { RouteService } from 'src/app/services/route.service';
import { VehicleService } from 'src/app/services/vehicle.service';

declare var $: any;

@Component({
  selector: 'app-vehicles-modal',
  templateUrl: './vehicles-modal.component.html',
  styleUrls: ['./vehicles-modal.component.css'],
})
export class VehiclesModalComponent implements OnInit {
  errorMessage: string = '';

  routeList: Array<Route> = [];
  @Input() vehicle: Vehicle = new Vehicle();
  @Output() save = new EventEmitter<any>();
  constructor(
    private vehicleService: VehicleService,
    private routeService: RouteService
  ) {}

  ngOnInit(): void {
    this.routeService.getAllRoutes().subscribe((data) => {
      this.routeList = data;
    });
  }

  saveVehicle() {
    this.vehicleService.saveVehicle(this.vehicle).subscribe(
      (data) => {
        this.save.emit(data);
        $('#vehicleSaveModal').modal('hide');
      },
      (err) => {
        this.errorMessage = err.error;
        console.log(err);
      }
    );
  }

  updateVehicle() {
    this.vehicleService.updateVehicle(this.vehicle).subscribe(
      (data) => {
        this.save.emit(data);
        $('#vehicleUpdateModal').modal('hide');
      },
      (err) => {
        this.errorMessage = err.error;
        console.log(err);
      }
    );
  }

  closeSaveModal() {
    $('#vehicleSaveModal').modal('hide');
  }

  closeUpdateModal() {
    $('#vehicleUpdateModal').modal('hide');
  }

  showSaveVehicleModal() {
    $('#vehicleSaveModal').modal('show');
  }

  showUpdateVehicleModal() {
    $('#vehicleUpdateModal').modal('show');
  }
}
