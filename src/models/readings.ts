import { Household } from "./household";

export class Readings{
    id: number;
    household: Household;
    mainPipe : number;
    //tapReadings: number;

    constructor(id: number, household: Household, mainPipe: number, /**tapReadings: number**/){
        this.id = id;
        this.household = household;
        this.mainPipe = mainPipe;
        //this.tapReadings = tapReadings;
        
    }
    
}