import { GenericError } from "../../utils/genericError.js";
import { loggerErrors } from "../../utils/loggers.js";
import MongoInstance from "../connector/mongodb.connector.js";
import GenericDAO from "./generic.dao.js";

class GenericDAOMongo extends GenericDAO {
    constructor(model) {
        super();
        this.model = model;
    }

    async getAll() {
        try {
            return await this.model.find({});
        } catch (err) {
            throw new GenericError({ status: 500, message: `Error getting all objects`, error });
        }
    }

    async deleteAll() {
        try {
            await this.model.deleteMany();
        } catch (error) {
            throw new GenericError({ status: 500, message: `Error deleting all objects`, error });
        }
    }

    async getById(idBuscado) {
        let buscado;
        try {
            buscado = await this.model.findOne({ _id: idBuscado });
        } catch (err) {
            throw new GenericError({ status: 500, message: "Error finding object " + err });
        }

        if (!buscado) {
            throw new GenericError({ status: 404, message: `Object Not found with id: ${idBuscado}` });
        }

        return buscado;
    }

    async create(object) {
        try {
            return await this.model.create(object);
        } catch (error) {
            throw new GenericError({ status: 500, message: "Error creating new object" + error });
        }
    }

    async update(id, object) {
        try {
            const obj = await this.getById(id);
            for(let key in object) {
                obj[key] = object[key];
            }
            return await obj.save();
        } catch (error) {
            throw new GenericError({ status: 500, message: "Error creating new object" + error });
        }
    }

    async deleteById(idParaBorrar) {
        let result;
        try {
            result = await productos.deleteOne({ _id: idParaBorrar });
        } catch (error) {
            throw new GenericError({ status: 500, message: `Error deleting object ` + error });
        }

        if (result.deletedCount == 0) {
            throw new GenericError({ status: 404, message: `Object Not found with id: ${idBuscado}` });
        }
    }
}

export default GenericDAOMongo;
