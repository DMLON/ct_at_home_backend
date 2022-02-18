import { messagesModel } from '../../models/messages.model.js';
import { loggerErrors } from '../../utils/loggers.js';
import GenericDAOMongo from './generic.mongodb.dao.js';

let instance = null;
export default class MessagesDaoMongo extends GenericDAOMongo {
    constructor() {
        if (!instance) {
            super(messagesModel)
            instance = this
        }
        return instance
    }

    async getMessagesByEmail(email) {
        return await this.model.find({ email:email }).sort({ createdAt: -1 });
    }
}