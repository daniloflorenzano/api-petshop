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

module.exports = {
    Serializer: Serializer,
    acceptedFormats: ['application/json']
}