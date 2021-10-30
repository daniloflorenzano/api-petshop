const router = require('express').Router({ mergeParams: true });
const Table = require('./TableProduto');

router.get('/', async (req, res) => {
	const produtos = await Table.list(req.params.idFornecedor);
	res.send(JSON.stringify(produtos));
});

module.exports = router;
