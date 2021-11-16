import { Component, OnInit, ViewChild } from '@angular/core';
import { Route } from 'src/app/models/route-model';
import { RouteService } from 'src/app/services/route.service';
import { RouteModalComponent } from './route-modal/route-modal.component';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {

  routeList: Array<Route> = [];
  selectedRoute: Route = new Route();
  errorMessage: string = '';

  @ViewChild(RouteModalComponent) child: RouteModalComponent | undefined;
  constructor(private routeService : RouteService) { }

  ngOnInit(): void {
    this.routeService.getAllRoutes().subscribe((data) => {
      this.routeList = data;
    });
  }

  createRouteRequest() {
    this.selectedRoute = new Route();
    this.child?.showSaveRouteModal();
  }

  editRouteRequest(item: Route) {
    this.selectedRoute = Object.assign({}, item);
    this.child?.showUpdateRouteModal();
  }

  saveRouteWatcher(route: Route) {
    let itemIndex = this.routeList.findIndex((item) => item.id === route.id);
    if (itemIndex !== -1) {
      this.routeList[itemIndex] = route;
    } else {
      this.routeList.push(route);
    }
  }

  deleteRoute(item: Route, ind: number) {
    this.routeService.deleteRoute(item).subscribe(
      (data) => {
        this.routeList.splice(ind, 1);
      },
      (err) => {
        this.errorMessage = 'Admin kullanicilar silinemez.';
        console.log(err);
      }
    );
  }

}
