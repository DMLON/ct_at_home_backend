import { messagesModel } from '../../models/messages.model.js';
import { loggerErrors } from '../../utils/loggers.js';
import GenericDAOMongo from './generic.mongodb.dao.js';

export default class MessagesDaoMongo extends GenericDAOMongo {
    constructor() {
        super(messagesModel)
    }
}