import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class DateTransformer {
    private static dateTimeFormat: string = "yyyy/MM/dd HH:mm:ss";

    constructor(private datePipe: DatePipe) { }

    transformDate(date: Date): string {
        console.log("A: " + date);
        console.log("B: " + date.toISOString());

        let dateString = this.datePipe.transform(date, DateTransformer.dateTimeFormat);
        console.log("C: " + dateString);

        if (dateString == null) {
            dateString = "";
        }

        return dateString;
    }
}