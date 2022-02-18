

export class GenericError{
    constructor({message, status}){
        this.message = message;
        this.status = status || 400;
    }
}

export class NotFound extends GenericError{
    constructor(obj,id){
        super({status: 404, message: `${obj} Not found with id: ${id}`});
    }
}

export const PageNotFoundError = new GenericError({message:'Page not found', status:404});