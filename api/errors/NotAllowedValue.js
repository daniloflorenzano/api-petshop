class NotAllowedValue extends Error {
    constructor(contentType) {
        super(`O tipo de conteúdo '${contentType}' não é suportado.`);
        this.name = NotAllowedValue;
        this.idError = 3;
    }
}

module.exports = NotAllowedValue;