const TableFornecedor = require('./TableFornecedor');

class Fornecedor {

    constructor({ id, empresa, email, categoria, dataCriacao, dataAtualizacao, versao }) {
        this.id = id;
        this.empresa = empresa;
        this.email = email;
        this.categoria = categoria;
        this.dataCriacao = dataCriacao;
        this.dataAtualizacao = dataAtualizacao;
        this.versao = versao;
    }

    async create() {

        this.validate()
        const res = await TableFornecedor.insert({
            empresa: this.empresa,
            email: this.email,
            categoria: this.categoria
        })

        this.id = res.id;
        this.dataCriacao = res.dataCriacao;
        this.dataAtualizacao = res.dataAtualizacao;
        this.versao = res.versao;
    }

    async getById() {
        const finded = await TableFornecedor.getById(this.id);
        this.empresa = finded.empresa
        this.email = finded.email;
        this.categoria = finded.categoria;
        this.dataCriacao = finded.dataCriacao;
        this.dataAtualizacao = finded.dataAtualizacao;
        this.versao = finded.versao;
    }

    async update() {
        await TableFornecedor.getById(this.id);
        const fields = ['empresa', 'email', 'categoria'];
        const dataForUpdate = {};

        fields.forEach((field) => {
            const value = this[field];

            if(typeof value === 'string' && value.length > 0) {
                dataForUpdate[field] = value;
            }
        })

        if(Object.keys(dataForUpdate).length === 0) {
            throw new Error('Não foram fornecidos dados para atualizar')
        }

        await TableFornecedor.update(this.id, dataForUpdate);
    }

    async remove() {
        return TableFornecedor.remove(this.id);
    }

    validate() {
        const fields = ['empresa', 'email', 'categoria'];
        
        fields.forEach(field => {
            const value = this[field];

            if(typeof value !== 'string' || value.length === 0) {
                throw new Error(`O campo '${field}' está inválido`);
            }
        })
    }
}

module.exports = Fornecedor;