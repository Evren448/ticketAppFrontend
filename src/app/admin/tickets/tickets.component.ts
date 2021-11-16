import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket-model';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  ticketList: Array<Ticket> = [];
  selectedTicket: Ticket = new Ticket();
  errorMessage: string = '';

  constructor(private ticketService : TicketService) { }

  ngOnInit(): void {
    this.ticketService.getAllTickets().subscribe((data) => {
      this.ticketList = data;
      console.log(data);
    });
  }

}
