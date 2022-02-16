import { ordersModel } from '../../models/orders.model.js';
import { loggerErrors } from '../../utils/loggers.js';
import GenericDAOMongo from './generic.mongodb.dao.js';

export default class OrdersDaoMongo extends GenericDAOMongo {
    constructor() {
        super(ordersModel)
    }
}