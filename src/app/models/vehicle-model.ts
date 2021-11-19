export class Vehicle{
    id: number | undefined;
    name: string ="";
    routeId : number | undefined;
    beginPoint: string ="";
    endPoint: string ="";
    seatingCapacity : number | undefined;
    availableCapacity : number | undefined;
    vehicleDate : Date = new Date();
}