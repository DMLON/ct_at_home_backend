

export class GenericError{
    constructor({message, status}){
        this.message = message;
        this.status = status || 400;
    }
}