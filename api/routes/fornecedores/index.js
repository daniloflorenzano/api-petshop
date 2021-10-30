const router = require('express').Router();
const TableFornecedor = require('./TableFornecedor');
const Fornecedor = require('./Fornecedor');
const SerializerFornecedor = require('../../Serializer').SerializerFornecedor;

router.get('/', async (req, res) => {
    const result = await TableFornecedor.list()
    res.status(200);
    const serializer = new SerializerFornecedor(
        res.getHeader('Content-Type')
    )
    res.send(
        serializer.serialize(result)
    );
})

router.post('/', async (req, res, next) => {
    try {
        const recievedData = req.body
        const fornecedor = new Fornecedor(recievedData);
        await fornecedor.create();
        res.status(201);
        const serializer = new SerializerFornecedor(
            res.getHeader('Content-Type')
        )
        res.send(
            serializer.serialize(fornecedor)
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
        const serializer = new SerializerFornecedor(
            res.getHeader('Content-Type'),
            ['email', 'dataCriacao', 'dataAtualizacao', 'versao']
        )
        res.send(
            serializer.serialize(fornecedor)
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

const routerProdutos = require('./produtos');
router.use('/:idFornecedor/produtos', routerProdutos)

module.exports = router;