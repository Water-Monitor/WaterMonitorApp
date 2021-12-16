export class Token {
    authorization: string;
    expires: Date;

    constructor(authorization: string) {
        this.authorization = authorization;
        this.expires = new Date(Date.now());
    }
}