const Sequelize = require('sequelize');
const instance = require('../../database');

const collums = {
    empresa: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    categoria: {
        type: Sequelize.ENUM('ração', 'brinquedos'),
        allowNull: false
    }
}

const options = {
    freezeTableName: true,
    tableName: 'fornecedores',
    timeStamp: true,
    createdAt: 'dataCriacao',
    updatedAt: 'dataAtualizacao',
    version: 'versao'
}

module.exports = instance.define('fornecedores', collums, options)