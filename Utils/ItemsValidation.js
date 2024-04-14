const Ajv = require("ajv");
const ajv = new Ajv();
    let itemsSchema = {
        type: "object",
        properties: {
            id: {type: "integer"} ,
            name: {type: "string", "minLength":3} ,
            price: {type: "integer", "minimum":1000} ,
            desc: {type: "string"},
        },
        required: ["id", "name", "price", "desc"],
        additionalProperties: false
    }
    module.exports = ajv.compile(itemsSchema); //==> function() //==> itemValid(data) ==> true|false
