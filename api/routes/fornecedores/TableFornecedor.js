const Model = require('./ModelTableFornecedor');

module.exports = {

    list() {
        return Model.findAll();
    },

    insert(fornecedor) {
        return Model.create(fornecedor)
    },

    async getById(id) {
        const finded = await Model.findOne({
            where: {
                id: id
            }
        })

        if(!finded) {
            throw new Error('Fornecedor não encontrado')
        }

        return finded;
    }
}