import { Role } from "./role";

export class User {
    id: number;
    name: string;
    username: string;
    roles: Role[];

    constructor(id: number, name: string, username: string, roles: Role[])
    {
        this.id = id;
        this.name = name;
        this.username = username;
        this.roles = roles;
    }
}