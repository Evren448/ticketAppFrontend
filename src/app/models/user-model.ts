import { Role } from "./role-model";

export class User{
    id: number | undefined;
    fullname: string ="";
    username: string = "";
    password: string ="";
    role : Role = Role.USER;
    token: string = "";
}