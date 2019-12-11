import { Schema, model } from "mongoose";

const consignmentSchema: Schema = new Schema(
    {
        "orderId": { type: String, required: true },
        "userId": { type: String, required: true },
        "consignmentId": { type: String, required: true },
        "sellers": { type: [Object], required: true },
        "deliveryLocation": { type: [Number], required: true },
        "senderLocation": { type: [Number], required: true },
        "consignmentStateUpdated": { type: [Date] },
        "consignmentEntryCreated": { type: Date, default: Date.now },
        "products": { type: [Object], required: true },
        "subTotal": { type: Number, required: true },
        "state": {
            type: String,
            enum: ['processing_order', 'verifying_payment', 'order_accepted', 'order_rejected', 'being_prepared', 'shipped', 'out_for_delivery', 'delivered', 'order_cancelled',
                "en_route_to_sender", "waiting_at_sender", "en_route_to_recipient", "delivered", "unsuccesful"],
            default: 'processing_order'
        },
    });

export const consignmentModel = model('feods-consignment', consignmentSchema, 'feods-consignment');