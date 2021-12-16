import { Role } from "./role";
import { Household } from "../household";

export class User {
    id: number;
    // household : Household;
    name: string;
    // surname: string;
    username: string;
    // email : string;
    roles: Role[];

    constructor(id: number, name: string, username: string, roles: Role[])
    {
        this.id = id;
        this.name = name;
        this.username = username;
        this.roles = roles;
    }
}