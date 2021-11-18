import { Address } from "./address";

export class Household{
    id: number;
    address: Address;
    householdSize: number;
    gardenSize: string;
    noOfCars: number;
    

    constructor(id: number, address: Address, houseHoldSize: number, gardenSize: string, noOfCars: number){
        this.id = id;
        this.address = address;
        this.householdSize = houseHoldSize;
        this.gardenSize = gardenSize;
        this.noOfCars = noOfCars;
        
    }
    
}