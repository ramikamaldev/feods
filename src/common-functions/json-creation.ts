import cryptoRandomString = require('crypto-random-string');
import { findSellerByID, createOrUpdateSeller } from "../dao/dao-models/mongo-dao/dao-seller-coll"

export async function consignmentJSONCreation(orderPayload) {

    return new Promise(async function (resolve, reject) {
        let sellerInformation = [];
        // orderPayload.foreach(async function (element) {
        //     let subTotal = 0;
        //     orderPayload.sellers.foreach(function()
        //     {

        //     })
        //     sellerInformation.push(await findSellerByID(orderPayload.sellerId));
        // })
        let subTotal = 0;
        let consignmentJSON = {
            "orderId": cryptoRandomString({ length: 10, characters: 'feods123456789' }),
            "user": orderPayload.user,
            "consignmentId": cryptoRandomString({ length: 10, characters: 'feods123456789' }),
            "deliveryLocation": orderPayload.userAdress,
            "senderLocation": "the world.",
            "consignmentStateUpdated": Date.now(),
            "consignmentEntryCreated": Date.now(),
            "products": orderPayload.productList,
            "subTotal": await calculateSubTotal(orderPayload, subTotal)
        }
        console.log("Consignment Order\n", consignmentJSON)
        return resolve(consignmentJSON);
    })
}

async function calculateSubTotal(orderedProductList, subTotal) {
    console.log("ORDER PRODUCT LIST")
    return new Promise(function (resolve, reject) {
        let parsedOrderProductList: Array<any> = JSON.parse(orderedProductList);
        parsedOrderProductList.forEach(function (orderedItem, index, orderPayloadArray) {
            subTotal += orderedItem.price;
            if (index === orderPayloadArray.length - 1) {
                console.log(subTotal);
                return resolve(subTotal);
            }
        })
    });
}