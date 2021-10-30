const router = require('express').Router({ mergeParams: true });
const Table = require('./TableProduto');
const Produto = require('./Produto');

router.get('/', async (req, res) => {
	const produtos = await Table.list(req.params.idFornecedor);
	res.send(JSON.stringify(produtos));
});

router.post('/', async (req, res) => {
	const idFornecedor = req.params.idFornecedor;
	const body = req.body;
	const data = Object.assign({}, body, { fornecedor: idFornecedor });
	const produto = new Produto(data);

	await produto.create();
	res.status(201);
    res.send(produto);
});

module.exports = router;
