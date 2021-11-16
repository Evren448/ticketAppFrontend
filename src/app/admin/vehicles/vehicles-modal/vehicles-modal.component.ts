import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle-model';
import { VehicleService } from 'src/app/services/vehicle.service';

declare var $: any;


@Component({
  selector: 'app-vehicles-modal',
  templateUrl: './vehicles-modal.component.html',
  styleUrls: ['./vehicles-modal.component.css']
})
export class VehiclesModalComponent implements OnInit {

  errorMessage : string = "";
    
  roleList: any = ['ADMIN', 'USER']
  @Input() vehicle : Vehicle = new Vehicle();
  @Output() save = new EventEmitter<any>();
  constructor(private vehicleService : VehicleService) { }

  ngOnInit(): void {
  }

  saveVehicle() {

    this.vehicleService.saveVehicle(this.vehicle).subscribe(data => {
      this.save.emit(data);
      $("#vehicleSaveModal").modal("hide");
    }, err => {
      this.errorMessage = 'Unexpected error occurred.';
      console.log(err);
    })
  }

  updateVehicle() {

    this.vehicleService.updateVehicle(this.vehicle).subscribe(data => {
      this.save.emit(data);
      $("#vehicleUpdateModal").modal("hide");
    }, err => {
      if (err?.status === 409) {
        this.errorMessage = 'Vehicle already exist.';
      } else {
        this.errorMessage = 'Unexpected error occurred. Error is: ' + err.error
        console.log(err);
      }
    })
  }

  closeSaveModal(){
    $("#vehicleSaveModal").modal("hide");
  }

  closeUpdateModal(){
    $("#vehicleUpdateModal").modal("hide");
  }

  showSaveVehicleModal(){
    $("#vehicleSaveModal").modal("show");
  }

  showUpdateVehicleModal(){
    $("#vehicleUpdateModal").modal("show");
  }

}
