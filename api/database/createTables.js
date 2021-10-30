const models = [
	require('../routes/fornecedores/ModelTableFornecedor'),
	require('../routes/fornecedores/produtos/ModelTableProduto'),
];

async function createTables() {
	for (let i = 0; i < models.length; i++) {
		const model = models[i];
		await model.sync();
	}
}

createTables();
