import { Schema, model } from "mongoose";

const productsSchema: Schema = new Schema(
    {
        "productId": { type: String, required: true },
        "stockLevels": { type: Number, required: true },
        "onHold": { type: Number, required: false },
        "price": { type: Number, required: true },
        "productName": {type: String, required:true},
        "productDescription": {type:String, required:true},
        "typesOfFlowers": {type:String, required:true},
        "currency":{type:String,required:true},
        "seller":{type:String,required:true},
        "sellerAddress":{type:String,required:true},
        "sellerCoordinates":{type: [Number], required:true}
    });

export const productsModel = model('feods-products', productsSchema, "feods-products");