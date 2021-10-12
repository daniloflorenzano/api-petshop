const router = require('express').Router();
const TableFornecedor = require('./TableFornecedor');
const Fornecedor = require('./Fornecedor');
const instance = require('../../database');
const NotFound = require('../../errors/NotFound');

router.get('/', async (req, res) => {
    const result = await TableFornecedor.list()
    res.status(200);
    res.send(
        JSON.stringify(result)
    );
})

router.post('/', async (req, res, next) => {
    try {
        const recievedData = req.body
        const fornecedor = new Fornecedor(recievedData);
        await fornecedor.create();
        res.status(201);
        res.send(
            JSON.stringify(fornecedor)
        );

    } catch (error) {
        next(error);
    }
})

router.get('/:idFornecedor', async (req, res, next) => {
    try {
        const id = req.params.idFornecedor;
        const fornecedor = new Fornecedor({ id: id });
        await fornecedor.getById()
        res.status(200);
        res.send(
            JSON.stringify(fornecedor)
        );

    } catch (error) {
        next(error);
    }
})

router.put('/:idFornecedor', async (req, res, next) => {
    try {
        const id = req.params.idFornecedor;
        const recievedData = req.body;
        const data = Object.assign({}, recievedData, { id: id });
        const fornecedor = new Fornecedor(data);
        await fornecedor.update()
        res.status(204);
        res.end();

    } catch (error) {
        next(error)
    }
})

router.delete('/:idFornecedor', async (req, res, next) => {
    try {
        const id = req.params.idFornecedor;
        const fornecedor = new Fornecedor({ id: id });
        await fornecedor.getById();
        await fornecedor.remove();
        res.status(204);
        res.end();

    } catch (error) {
        next(error);
    }
})

module.exports = router;