import cryptoRandomString = require('crypto-random-string');
import { findSellerByID, createOrUpdateSeller } from "../dao/dao-models/mongo-dao/dao-seller-coll"

export async function consignmentJSONCreation(orderPayload) {
    //TODO: create multiple seller payloads
    let sellerInformation: any = await findSellerByID(orderPayload.productList.sellerName);
    let consignmentJSON = {
        "orderId": cryptoRandomString(),
        "userEmail": orderPayload.userEmail,
        "consignmentId": cryptoRandomString(),
        "deliveryLocation": orderPayload.userAdress,
        "senderLocation": sellerInformation.sellerAddress,
        "consignmentStateUpdated": Date.now(),
        "products":orderPayload.productList
    }
    return consignmentJSON;
}