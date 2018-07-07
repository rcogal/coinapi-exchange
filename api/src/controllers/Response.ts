export class Response {
    public success!: boolean;
    public result!: any;
    public message!: string;

    constructor(success: boolean, result: any, message: string) {
        this.success = success;
        this.result = result;
        this.message = message;
    }
}