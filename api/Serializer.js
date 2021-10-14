const NotAllowedValue = require('./errors/NotAllowedValue')
;
class Serializer {
    json(data) {
        return JSON.stringify(data);
    }

    serilize(data) {
        if(this.contentType === 'application/json') {
            return this.json(
                this.filter(data)
            );
        }

        throw new NotAllowedValue(this.contentType);
    }

    objectFilter(data) {
        const newObject = {};

        this.publicFields.forEach((field) => {
            if(data.hasOwnProperty(field)) {
                newObject[field] = data[field];
            }
        })

        return newObject;
    }

    filter(data) {
        if(Array.isArray(data)) {
            data = data.map(item => {
                return this.objectFilter(item);
            });
        } else {
            data = this.objectFilter(data)
        }

        return data;
    }
}

class SerializerFornecedor extends Serializer {
    constructor(contentType) {
        super();
        this.contentType = contentType;
        this.publicFields = ['id', 'empresa', 'categoria']
    }
}

module.exports = {
    Serializer: Serializer,
    SerializerFornecedor: SerializerFornecedor,
    acceptedFormats: ['application/json']
}