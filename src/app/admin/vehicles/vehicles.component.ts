import { Component, OnInit, ViewChild } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle-model';
import { VehicleService } from 'src/app/services/vehicle.service';
import { VehiclesModalComponent } from './vehicles-modal/vehicles-modal.component';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  vehicleList: Array<Vehicle> = [];
  selectedVehicle: Vehicle = new Vehicle();
  errorMessage: string = '';

  @ViewChild(VehiclesModalComponent) child: VehiclesModalComponent | undefined;
  constructor(private vehicleService : VehicleService) { }

  ngOnInit(): void {
    this.vehicleService.getAllVehicles().subscribe((data) => {
      this.vehicleList = data;
    });
  }

  createVehicleRequest() {
    this.selectedVehicle = new Vehicle();
    this.child?.showSaveVehicleModal();
  }

  editVehicleRequest(item: Vehicle) {
    this.selectedVehicle = Object.assign({}, item);
    this.child?.showUpdateVehicleModal();
  }

  saveVehicleWatcher(vehicle: Vehicle) {
    let itemIndex = this.vehicleList.findIndex((item) => item.id === vehicle.id);
    if (itemIndex !== -1) {
      this.vehicleList[itemIndex] = vehicle;
    } else {
      this.vehicleList.push(vehicle);
    }
  }

  deleteVehicle(item: Vehicle, ind: number) {
    this.vehicleService.deleteVehicle(item).subscribe(
      (data) => {
        this.vehicleList.splice(ind, 1);
      },
      (err) => {
        this.errorMessage = 'Admin kullanicilar silinemez.';
        console.log(err);
      }
    );
  }

}
