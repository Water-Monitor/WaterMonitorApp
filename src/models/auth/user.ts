import { Role } from "./role";
import { Household } from "../household";

export class User {
    id: number;
    household : Household;
    name: string;
    surname: string;
    username: string;
    email : string;
    roles: Role[];

    constructor(id: number, household:Household, name: string, surname:string, username: string, email:string, roles: Role[])
    {
        this.id = id;
        this.household = household
        this.name = name;
        this.surname = surname;
        this.username = username;
        this.email = email
        this.roles = roles;
    }
}