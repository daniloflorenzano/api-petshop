const NotAllowedValue = require('./errors/NotAllowedValue')
;
class Serializer {
    json(data) {
        return JSON.stringify(data);
    }

    serilize(data) {
        if(this.contentType === 'application/json') {
            return this.json(data);
        }

        throw new NotAllowedValue(this.contentType);
    }
}

class SerializerFornecedor extends Serializer {
    constructor(contentType) {
        super();
        this.contentType = contentType;
    }
}

module.exports = {
    Serializer: Serializer,
    SerializerFornecedor: SerializerFornecedor,
    acceptedFormats: ['application/json']
}