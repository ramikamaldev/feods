import { Schema, model } from "mongoose";

const productsSchema: Schema = new Schema(
    {
        "sellerName": { type: String, required: true },
        "sellersAddress": { type: String, required: true },
        "sellerCoordinates": { type: [Number], required: true },
        "sellerPhoneNumber": { type: Number, required: true },
    });

export const sellersModel = model('feods-sellers', productsSchema, "feods-sellers");