const router = require('express').Router();
const TableFornecedor = require('./TableFornecedor');
const Fornecedor = require('./Fornecedor');

router.get('/', async (req, res) => {
    const result = await TableFornecedor.list()
    res.send(
        JSON.stringify(result)
    );
})

router.post('/', async (req, res) => {

    try {
        const recievedData = req.body
        const fornecedor = new Fornecedor(recievedData);
        await fornecedor.create();
        res.send(
            JSON.stringify(fornecedor)
        )

    } catch (error) {
        res.send(
            JSON.stringify({
                message: error.message
            })
        )
    }
})

router.get('/:idFornecedor', async (req, res) => {

    try {
        const id = req.params.idFornecedor;
        const fornecedor = new Fornecedor({ id: id });
        await fornecedor.getById()
        res.send(
            JSON.stringify(fornecedor)
        )
    } catch (error) {
        res.send(
            JSON.stringify({
                message: error.message
            })
        )
    }
})

router.put('/:idFornecedor', async (req, res) => {

    try {
        const id = req.params.idFornecedor;
        const recievedData = req.body;
        const data = Object.assign({}, recievedData, { id: id });
        const fornecedor = new Fornecedor(data);
        await fornecedor.update()
        res.end()

    } catch (error) {
        res.send(
            JSON.stringify({
                message: error.message
            })
        )
    }
})

router.delete('/:idFornecedor', async (req, res) => {

    try {
        const id = req.params.idFornecedor;
        const fornecedor = new Fornecedor({ id: id });
        await fornecedor.getById();
        await fornecedor.remove();
        res.end();

    } catch (error) {
        res.send(
            JSON.stringify({
                message: error.message
            })
        )
    }
})



module.exports = router;