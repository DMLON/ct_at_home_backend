import { userModel } from '../../models/users.model.js';
import { loggerErrors } from '../../utils/loggers.js';
import GenericDAOMongo from './generic.mongodb.dao.js';

export default class UsersDaoMongo extends GenericDAOMongo {
    constructor() {
        super(userModel)
    }
}