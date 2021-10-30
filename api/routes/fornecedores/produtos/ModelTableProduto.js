const Sequelize = require('sequelize');
const instance = require('../../../database');

const collums = {
	titulo: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	preco: {
		type: Sequelize.DOUBLE,
		allowNull: false,
	},
	estoque: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	fornecedor: {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: require('../ModelTableFornecedor'),
			key: 'id',
		},
	},
};

const options = {
	freezeTableName: true,
	tableName: 'produto',
	timeStamp: true,
	createdAt: 'dataCriacao',
	updatedAt: 'dataAtualizacao',
	version: 'versao',
};

module.exports = instance.define('produto', collums, options);
