import { Component, OnInit, ViewChild } from '@angular/core';
import { Ticket } from 'src/app/models/ticket-model';
import { User } from 'src/app/models/user-model';
import { AuthService } from 'src/app/services/auth.service';
import { TicketService } from 'src/app/services/ticket.service';
import { UserModalTicketComponent } from './user-modal-ticket/user-modal-ticket.component';

@Component({
  selector: 'app-userticket',
  templateUrl: './userticket.component.html',
  styleUrls: ['./userticket.component.css']
})
export class UserticketComponent implements OnInit {

  ticketList: Array<Ticket> = [];
  selectedTicket: Ticket = new Ticket();
  errorMessage: string = "";
  user : User = new User();

  @ViewChild(UserModalTicketComponent) child: UserModalTicketComponent | undefined;
  constructor(private ticketService : TicketService, private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    this.ticketService.getUserTickets(this.user).subscribe(data => {
      this.ticketList = data;
      console.log(data);
    });
  }

  deleteTicket(item: Ticket, ind: number) {
    this.ticketService.deleteTicket(item).subscribe(
      (data) => {
        this.ticketList.splice(ind, 1);
      },
      (err) => {
        //this.errorMessage = 'Admin kullanicilar silinemez.';
        console.log(err);
      }
    );
  }

  editTicketRequest(item: Ticket) {
    this.selectedTicket = Object.assign({}, item);
    this.child?.showUpdateVehicleModal();
  }

  saveTicketWatcher(ticket: Ticket) {
    let itemIndex = this.ticketList.findIndex((item) => item.id === ticket.id);
    if (itemIndex !== -1) {
      this.ticketList[itemIndex] = ticket;
    } else {
      this.ticketList.push(ticket);
    }
  }

}
