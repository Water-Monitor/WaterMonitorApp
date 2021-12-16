import { RoomType } from "./roomType";

export class Room{
    reading: number;
    roomType: RoomType;

    constructor(reading:number, roomType:RoomType){
        this.reading = reading;
        this.roomType = roomType;
    }
}