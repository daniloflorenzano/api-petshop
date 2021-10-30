const Table = require('./TableProduto');

class Produto {
	constructor({
		id,
		titulo,
		preco,
		estoque,
		fornecedor,
		dataCriacao,
		dataAtualizacao,
		versao,
	}) {
		this.id = id;
		this.titulo = titulo;
		this.preco = preco;
		this.estoque = estoque;
		this.fornecedor = fornecedor;
		this.dataCriacao = dataCriacao;
		this.dataAtualizacao = dataAtualizacao;
		this.versao = versao;
	}

	async create() {
		const result = await Table.insert({
			titulo: this.titulo,
			preco: this.preco,
			estoque: this.estoque,
			fornecedor: this.fornecedor,
		});

		this.id = result.id;
		this.dataCriacao = result.dataCriacao;
		this.dataAtualizacao = result.dataAtualizacao;
		this.versao = result.versao;
	}
}

module.exports = Produto;
