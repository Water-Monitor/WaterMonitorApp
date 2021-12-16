export class Address{
    id: number;
    houseNmr: number;
    street: string;
    city: string;
    state: string;
    postalCode: number;
    country: string;

    constructor(id: number, houseNmr: number, street: string, city: string, state: string, postalCode: number, country: string){
        this.id = id;
        this.houseNmr = houseNmr;
        this.street = street;
        this.city = city;
        this.state = state;
        this.postalCode = postalCode;
        this.country = country;
        
    }
    
}