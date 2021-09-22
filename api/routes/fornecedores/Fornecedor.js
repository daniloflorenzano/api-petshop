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
}

module.exports = Fornecedor;