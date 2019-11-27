import { Schema, model } from "mongoose";

const productsSchema: Schema = new Schema(
    {
        "userEmail": { type: String, required: true },
        "userAddress": { type: String, required: true },
        "phoneNumber": { type: Number, required: true },
    });

export const usersModel = model('feods-users', productsSchema, "feods-users");