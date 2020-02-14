import { productsModel } from "../mongo-schemas/feods-products-coll-schema"
import { productsJSON } from "../../../common-functions/coll-population/products"


export function searchForProductsByID(productIds): Promise<string> {
    return new Promise(async function (resolve, reject) {
        try {
            let stream = await productsModel.collection.find({ "productId": { "$in": productIds } }).stream();
            let docArray = [];
            stream.on('data', function (doc) {
                docArray.push(doc)
            });
            stream.on('close', function () {
                resolve(JSON.stringify(docArray));
                return;
            })
        }
        catch (err) {
            reject(err);
            return;
        }
    })
}

export function updateProductStockNumbers(productOrderArray) {
    //     productOrderArray: 
    // [
    // 	{productID: 1, orderQuantity: 3},
    // 	{productID: 2, orderQuantity: 4}
    // ]
    let bulkProductExecution = productsModel.collection.initializeUnorderedBulkOp();
    productOrderArray.forEach(function (product) {
        bulkProductExecution.find({ productId: product.productId }).update({ $inc: { "stockLevels": -product.orderQuantity } });
    })
    bulkProductExecution.execute(function (err, result) {
        if (err) {
            console.log(err)
        }
        else {
            return result;
        }
    })
}

export function findAllProducts() {
    productsModel.find({}, function (err, result) {
        if (err) {
            return console.log(err);
        }
        return console.log("find all products: " + result);
    })
}

export function createProductsInColl() {
    productsModel.insertMany(productsJSON, function (err, result) {
        if (err) {
            console.log(err);
        }
        return console.log(result);
    })
}