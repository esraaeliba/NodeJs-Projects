const Ajv = require("ajv");
const ajv = new Ajv();
    let ordersSchema = {
        type: "object",
        properties: {
            id: {type: "integer"} ,
            totalPrice: {type: "integer", "minimum":5000} ,
            items: {type: "array", items:{type: "integer"}}
        },
        required: ["id", "totalPrice", "items"],
        additionalProperties: false
    }
    module.exports = ajv.compile(ordersSchema); //==> function() //==> OrderValid(data) ==> true|false
