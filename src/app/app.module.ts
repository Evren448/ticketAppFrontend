import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import { LoginComponent } from './guest/login/login.component';
import { SignupComponent } from './guest/signup/signup.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { UnauthorizedComponent } from './error/unauthorized/unauthorized.component';
import { AdminComponent } from './admin/admin/admin.component';
import { UsersComponent } from './admin/users/users.component';
import { ModalComponent } from './admin/users/modal/modal.component';
import { RoutesComponent } from './admin/routes/routes.component';
import { RouteModalComponent } from './admin/routes/route-modal/route-modal.component';
import { VehiclesComponent } from './admin/vehicles/vehicles.component';
import { VehiclesModalComponent } from './admin/vehicles/vehicles-modal/vehicles-modal.component';
import { TicketsComponent } from './admin/tickets/tickets.component';
import { UserticketComponent } from './user/userticket/userticket.component';
import { UserModalTicketComponent } from './user/userticket/user-modal-ticket/user-modal-ticket.component';
import { HomeComponent } from './guest/home/home.component';

@NgModule({
  declarations: [
    AppComponent,    LoginComponent,
    HomeComponent,
    SignupComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    AdminComponent,
    UsersComponent,
    ModalComponent,
    RoutesComponent,
    RouteModalComponent,
    VehiclesComponent,
    VehiclesModalComponent,
    TicketsComponent,
    UserticketComponent,
    UserModalTicketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
