import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ticket } from 'src/app/models/ticket-model';
import { TicketService } from 'src/app/services/ticket.service';

declare var $: any;

@Component({
  selector: 'app-user-modal-ticket',
  templateUrl: './user-modal-ticket.component.html',
  styleUrls: ['./user-modal-ticket.component.css'],
})
export class UserModalTicketComponent implements OnInit {
  errorMessage: string = '';

  statusList: any = ['DELAYED', 'CANCALLED'];
  @Input() ticket: Ticket = new Ticket();
  @Output() save = new EventEmitter<any>();
  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {}

  updateTicket() {
    this.ticketService.updateTicket(this.ticket).subscribe(
      (data) => {
        this.save.emit(data);
        $('#ticketUpdateModal').modal('hide');
      },
      (err) => {
        this.errorMessage = err.error;
      }
    );
  }

  closeSaveModal() {
    $('#ticketSaveModal').modal('hide');
  }

  closeUpdateModal() {
    $('#ticketUpdateModal').modal('hide');
  }

  showSaveVehicleModal() {
    $('#ticketSaveModal').modal('show');
  }

  showUpdateVehicleModal() {
    $('#ticketUpdateModal').modal('show');
  }
}
