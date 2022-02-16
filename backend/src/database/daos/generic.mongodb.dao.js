import { loggerErrors } from '../../utils/loggers.js';
import MongoInstance from '../connector/mongodb.connector.js';
import GenericDAO from './generic.dao.js';


class GenericDAOMongo extends GenericDAO {
    constructor(model) {
        this.model = model;
    }

    async getAll() {
        try {
        return await this.model.find({});
        } catch (err) { loggerErrors.error(err) }
    }


    async deleteAll() {
        try {
            await this.model.deleteMany()
        } catch (error) {
            throw new Error({status:500, messages:`Error deleting all objects`, error})
        }
    }

    async getById(idBuscado) {
        let buscado;
        try {
            buscado = await this.model.findOne({ _id: idBuscado })
        } catch (err) {
            throw new Error({status:500, message:'Error finding object ' + err})
        }

        if (!buscado) {
            throw new Error({status:404, message:`Object Not found with id: ${idBuscado}` })
        }

        return buscado
    }

    async create(object) {
        try {
            return await this.model.save(object)
        } catch (error) {
            throw new Error({status:500, message:'Error creating new object' + error})
        }
    }

    async update(id, object) {
        try {
            return await this.model.updateOne({ _id: id }, object)
        } catch (error) {
            throw new Error({status:500, message:'Error creating new object' + error})
        }
    }

    async deleteById(idParaBorrar) {
        let result
        try {
            result = await productos.deleteOne({ _id: idParaBorrar })
        } catch (error) {
            throw new Error({status:500, message:`Error deleting object ` + error})
        }

        if (result.deletedCount == 0) {
            throw new Error({status:404, message:`Object Not found with id: ${idBuscado}` })
        }
    }
}

export default GenericDAOMongo;
