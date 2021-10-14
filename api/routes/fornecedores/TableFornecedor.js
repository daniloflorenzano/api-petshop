const Model = require('./ModelTableFornecedor');
const NotFound = require('../../errors/NotFound')

module.exports = {

    list() {
        return Model.findAll({ raw: true });
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

        if (!finded) {
            throw new NotFound();
        }

        return finded;
    },

    async update(id, dataForUpdate) {
        return Model.update(
            dataForUpdate,
            {
                where: { id: id }
            }
        )
    },

    async remove(id) {
        return Model.destroy({
            where: { id: id }
        })
    }
}