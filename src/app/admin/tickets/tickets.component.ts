import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/models/status-enum';
import { Ticket } from 'src/app/models/ticket-model';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent implements OnInit {
  begin: string = '';
  end: string = '';
  status: Status = Status.CANCALLED;
  date: Date = new Date();

  ticketList: Array<Ticket> = [];
  selectedTicket: Ticket = new Ticket();
  errorMessage: string = '';

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.ticketService.getAllTickets().subscribe((data) => {
      this.ticketList = data;
      console.log(data);
    });
  }
  clickme() {
    this.ticketService.getAllTicketsByStatus(this.status).subscribe(
      (data) => {
        this.ticketList = data;
      },
      (err) => {
        this.errorMessage = err.error;
      }
    );
  }
  SearchList() {
    this.ticketService
      .getAllTicketsByStatusAndDateAndBeginAndEnd(
        this.status,
        this.date,
        this.begin,
        this.end
      )
      .subscribe(
        (data) => {
          this.ticketList = data;
          this.errorMessage = '';
        },
        (err) => {
          if (err?.status === 400) {
            this.errorMessage = 'Butun alanlari lutfen doldurun.';
          } else {
            this.errorMessage = err.error;
          }
        }
      );
  }
  ResetList(){
    this.ngOnInit();
    this.begin = '';
    this.end = '';
    this.status = Status.CANCALLED;
    this.date = new Date();
  }
}
