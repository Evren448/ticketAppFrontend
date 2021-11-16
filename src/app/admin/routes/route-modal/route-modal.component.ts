import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Route } from 'src/app/models/route-model';
import { RouteService } from 'src/app/services/route.service';

declare var $: any;

@Component({
  selector: 'app-route-modal',
  templateUrl: './route-modal.component.html',
  styleUrls: ['./route-modal.component.css']
})
export class RouteModalComponent implements OnInit {

  errorMessage : string = "";
    
  roleList: any = ['ADMIN', 'USER']
  @Input() route : Route = new Route();
  @Output() save = new EventEmitter<any>();

  constructor(private routeService : RouteService) { }

  ngOnInit(): void {
  }

  saveRoute() {

    this.routeService.saveRoute(this.route).subscribe(data => {
      this.save.emit(data);
      $("#routeSaveModal").modal("hide");
    }, err => {
      this.errorMessage = 'Unexpected error occurred.';
      console.log(err);
    })
  }

  updateRoute() {

    this.routeService.updateRoute(this.route).subscribe(data => {
      this.save.emit(data);
      $("#routeUpdateModal").modal("hide");
    }, err => {
      if (err?.status === 409) {
        this.errorMessage = 'Route already exist.';
      } else {
        this.errorMessage = 'Unexpected error occurred. Error is: ' + err.error
        console.log(err);
      }
    })
  }

  closeSaveModal(){
    $("#routeSaveModal").modal("hide");
  }

  closeUpdateModal(){
    $("#routeUpdateModal").modal("hide");
  }

  showSaveRouteModal(){
    $("#routeSaveModal").modal("show");
  }

  showUpdateRouteModal(){
    $("#routeUpdateModal").modal("show");
  }
}
