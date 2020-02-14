import { consignmentModel } from "../mongo-schemas/feods-consignment-coll-schema"
import { checkIfCollectionExistsAndExecute } from "../../../common-functions/utility-functions"

export function createConsignmentOrder(consignmentJSON) {
    let createDocument = function (resolve, reject, consignmentOrder) {
        consignmentModel.create(consignmentOrder).then(
            function (response) {
                return resolve(response);
            }).catch(
                function (err) {
                    console.log("rejecting");
                    reject(err);
                })
    };
    let updateDocument = function (resolve, reject, consignmentOrder) {
        consignmentModel.updateOne({ consignmentId: consignmentOrder["consignmentId"] }, { $set: { consignmentOrder } }, { upsert: true }).then(
            function (response) {
                return resolve(response);
            }).catch(
                function (err) {
                    reject(err);
                })
    }
    return new Promise(function (resolve, reject) {
        checkIfCollectionExistsAndExecute(resolve, reject, consignmentModel, updateDocument, consignmentJSON, createDocument);
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