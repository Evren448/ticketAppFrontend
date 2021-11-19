import { Status } from "./status-enum";

export class Ticket{
    id: number | undefined;
    status : Status = Status.TAKEN;
    userId : number | undefined;
    vehicleId : number | undefined;
    routeId : number | undefined;
    ticketOwner : string = "";
    routeStart : string = "";
    routeEnd : string = "";
    seatingCapacity : number | undefined;
    availableCapacity : number | undefined;
    vehicleDate : Date = new Date();
    vehicleName : string = "";
}