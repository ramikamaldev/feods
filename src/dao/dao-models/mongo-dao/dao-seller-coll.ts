import { sellersModel } from "../mongo-schemas/feods-sellers-coll-schema"

export function createOrUpdateSeller(createSellerPaylodJSON) {
    sellersModel.findOneAndUpdate({ createSellerPaylodJSON }, { upsert: true }, function (err, result) {
        return result;
    })
}

export function findSellerByID(findSellerPaylodJSON): any {
    return new Promise(async function (resolve, reject) {
        try {
            return resolve(await sellersModel.findOne({ sellerEmail: findSellerPaylodJSON.sellerEmail }))
        }
        catch (err) {
            return reject(err)
        }

    })
}