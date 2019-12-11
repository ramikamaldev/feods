import { sellersModel } from "../mongo-schemas/feods-sellers-coll-schema"

export function createOrUpdateSeller(createSellerPayloadJSON, callback) {
    console.log(createSellerPayloadJSON)
    sellersModel.create(createSellerPayloadJSON, callback)
}

export function findSellerByID(findSellerPaylodJSON): any {
    return new Promise(async function (resolve, reject) {
        try {
            return resolve(await sellersModel.findOne({ sellerId: findSellerPaylodJSON.sellerId }))
        }
        catch (err) {
            return reject(err)
        }

    })
}