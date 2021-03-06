const Model = require('./ModelTableProduto');

module.exports = {
	list(idFornecedor) {
		return Model.findAll({
			where: {
				fornecedor: idFornecedor,
			},
		});
	},
	insert(data) {
		return Model.create(data);
	},
};
