import { Address } from "./address";
import { Room } from "./room";
import { RoomType } from "./roomType";

export class Household{
    id: number;
    address: Address;
    householdSize: number;
    gardenSize: string;
    noOfCars: number;
    rooms: Room[];
    

    constructor(id: number, address: Address, houseHoldSize: number, gardenSize: string, noOfCars: number, rooms:Room[]){
        this.id = id;
        this.address = address;
        this.householdSize = houseHoldSize;
        this.gardenSize = gardenSize;
        this.noOfCars = noOfCars;
        this.rooms = rooms;
    }
    
}