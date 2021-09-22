const ModelTable = require('../routes/fornecedores/ModelTableFornecedor');

ModelTable
    .sync()
    .then(() => console.log('Table created'))
    .catch(console.log)