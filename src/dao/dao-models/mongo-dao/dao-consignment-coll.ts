import { consignmentModel } from "../mongo-schemas/feods-consignment-coll-schema"

export function createConsignmentOrder(consignmentJSON) {
    consignmentModel.findOneAndUpdate({ consignmentJSON }, { upsert: true }, function (err, result) {
        return result;
    })
}

export function updateConsignmentStatus(updateConsignmentJSON) {
    consignmentModel.findOneAndUpdate({ orderID: updateConsignmentJSON["orderID"] }, { $set: { "status": updateConsignmentJSON["status"] } }, function (err, result) {
        return result;
    })
}

export function retrieveCurrentConsignmentStatus(orderID) {
    consignmentModel.findOne({ orderId: orderID }, function (err, result) {
        return result;
    })
}