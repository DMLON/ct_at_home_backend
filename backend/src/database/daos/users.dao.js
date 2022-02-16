import { userModel } from '../../models/users.model.js';
import { loggerErrors } from '../../utils/loggers.js';
import GenericDAOMongo from './generic.mongodb.dao.js';

let instance = null
export default class UsersDaoMongo extends GenericDAOMongo {
    constructor() {
        if (!instance) {
            super(userModel)
            instance = this
        }
        return instance
    }

    async getByEmail(email) {
        try {
            return await this.model.findOne({ email: email });
        } catch (error) {
            throw error;
        }
    }

}