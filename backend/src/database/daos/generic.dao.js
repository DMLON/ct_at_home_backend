
class GenericDAO {
    async getAll() { throw new Error('not implemented!') }
    async getById(id) { throw new Error('not implemented!') }
    async create(object) { throw new Error('not implemented!') }
    async update(id,object) { throw new Error('not implemented!') }
    async deleteById(id) { throw new Error('not implemented!') }
    async deleteAll() { throw new Error('not implemented!') }
}

export default GenericDAO;