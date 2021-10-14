const NotAllowedValue = require('./errors/NotAllowedValue')
;
class Serializer {
    json(data) {
        return JSON.stringify(data);
    }

    serialize(data) {
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
    constructor(contentType, extraFields) {
        super();
        this.contentType = contentType;
        this.publicFields = [
            'id',
            'empresa',
            'categoria'
        ].concat(extraFields || []);
    }
}

class SerializerError extends Serializer {
    constructor(contentType, extraFields) {
        super();
        this.contentType = contentType;
        this.publicFields = [
            'id',
            'message'
        ].concat(extraFields || []);
    }
}

module.exports = {
    Serializer: Serializer,
    SerializerFornecedor: SerializerFornecedor,
    SerializerError: SerializerError,
    acceptedFormats: ['application/json']
}