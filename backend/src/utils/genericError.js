

export class GenericError{
    constructor({message, status}){
        this.message = message;
        this.status = status || 400;
    }
}

export const PageNotFoundError = new GenericError({message:'Page not found', status:404});