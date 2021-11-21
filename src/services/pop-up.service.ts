import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PopUpService {

    constructor(
    ) { }

    async showMessage(message: string) {
        console.log(message);
    }

    async failedToPerformMessage(task: string) {
        this.showMessage(`A problem occured ${task}...`);
    }

    async presentAlert(header: string, message: string) {
        console.log(header + message);
    }

    async presentLoading() {
    }

    async dismissLoading() {
    }
}