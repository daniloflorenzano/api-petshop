const NotAllowedValue = require('./errors/NotAllowedValue');
const jsontoxml = require('jsontoxml');

class Serializer {
    json(data) {
        return JSON.stringify(data);
    }

    xml(data) {
        let tag = this.singularTag;

        if(Array.isArray(data)) {
            tag = this.pluralTag;
            data = data.map((item) => {
                return {
                    [this.singularTag]: item
                }
            })
        }

        return jsontoxml({ [tag]: data });
    }

    serialize(data) {
        data = this.filter(data);

        if(this.contentType === 'application/json') {
            return this.json(data);
        }

        if(this.contentType === 'application/xml') {
            return this.xml(data);
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
        this.singularTag = 'fornecedor';
        this.pluralTag = 'fornecedores';
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
        this.singularTag = 'erro';
        this.pluralTag = 'erros';
    }
}

module.exports = {
    Serializer: Serializer,
    SerializerFornecedor: SerializerFornecedor,
    SerializerError: SerializerError,
    acceptedFormats: ['application/json', 'application/xml']
}