class MissingData extends Error {
    constructor() {
        super('Não foram fornecidos dados para atualizar.');
        this.name = MissingData;
        this.idError = 2;
    }
}

module.exports = MissingData;