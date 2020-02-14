import express from "express";
import { createConsignmentOrder, retrieveCurrentConsignmentStatus, updateConsignmentStatus } from "../dao/dao-models/mongo-dao/dao-consignment-coll"
import { parse, stringify } from "flatted/cjs"
import { findAllProducts, searchForProductsByID } from "../dao/dao-models/mongo-dao/dao-products-coll";
import { } from "../dao/dao-models/mongo-dao/dao-consignment-coll"
import { createPaypalPayment, executePaypalPayment } from "../feods-functionality/payments/paypal"
import * as cryptoRandomString from "crypto-random-string"
import { createProductsInColl, createOrUpdateSeller,createOrUpdateOrRetreieveUser } from "../dao"
import { consignmentJSONCreation } from "../common-functions/json-creation"

export function createAndReturnFeodsRouter() {
    let router = express.Router();
    router.use("/happy", rootFunction);
    router.use("/order-delivery-status", returnDeliveryStatusFunction);
    //Protect these endpoints. 
    router.use("/update-order-delivery-status", updateDeliveryStatusFunction);
    router.use("/create-new-order", createOrderAndPay);
    router.use("/redirect-url", redirectURL);
    router.use(`/add-to-cart/:id`, addToCart);
    router.use('/create-seller-coll', createOrUpdateSellerEndpoint)

    //Utility endpoints
    router.use("/populate-products-collection", populateProductsCollection)
    //Root
    router.use("/", serveHomePage);
    return router;
}

function rootFunction(req: express.Request, res: express.Response) {
    console.log(req.body);
    res.status(200).send(`hi, happy :)\n${req.body}`);
}

function serveHomePage(req: express.Request, res: express.Response) {
    findAllProducts();
    return res.render(`homepage-${process.env.ENV.toLowerCase()}.html`)
}

function addToCart(req: express.Request, res: express.Response) {
    let productid = req.params.productid;
}

async function createOrderAndPay(req: express.Request, res: express.Response) {
    //START OF PRODUCT SEARCH
    let productIdArray = [];
    let requestedOrderPayload: Array<any> = req.body;
    let userEmailAddress = req.body.userEmailAddress;
    let randomString = cryptoRandomString.default({ length: 10, type: 'base64' });
    requestedOrderPayload.forEach(function (element) {
        let productId = element.productId;
        productIdArray.push(productId);
    });
    let searchForProductsResult: string = await searchForProductsByID(productIdArray);
    console.log("SearchForProductResult: ", JSON.parse(searchForProductsResult));
    //Products that match the productID Array passed in.
    //If these products all have a quantity above 1 or above the required number: proceed
    let unavailableProducts = [];
    let availableProductList = [];
    productIdArray.forEach(function (orderedProduct) {
        JSON.parse(searchForProductsResult).forEach(function (searchResultJSONElement) {
            if (searchResultJSONElement.productId === orderedProduct.productId) {
                if (searchResultJSONElement.stockLevels >= orderedProduct.quantity) {
                    //this product is available, add to finalcheckout
                    availableProductList.push(searchForProductsResult);
                }
                else {
                    //add item to unavailable list
                    unavailableProducts.push(searchForProductsResult);
                }
            }
        })
    })
    //END OF PRODUCT SEARCH
    //START OF USER RETRIEVAL
    console.log("Awaiting user function");
    let user = await createOrUpdateOrRetreieveUser(userEmailAddress);
    console.log("User", user)
    //END OF USER RETRIEVAL

    if (unavailableProducts.length === 0) {
        console.log("Awaiting consignmentJSONCreation")
        let consignmentJSON = await consignmentJSONCreation(searchForProductsResult);
        console.log("*************************************************\n", consignmentJSON);
        let consignmentOrderCreationInDB = createConsignmentOrder(consignmentJSON);
        console.log("Creating payPalPayment")
        createPaypalPayment(consignmentOrderCreationInDB);
        initialisePaypalPayment();
        // var request = require('r eequest');
        // request('', function (error, response, body) {
        //     console.log('error:',rror); // Print the error if one occurred
        //     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //     console.log('body:', body); // Print the HTML for the Google homepage.
        // });
        // //res.redirect(res.body.links);
    }
    return res.send().status(400);
}

function createOrUpdateSellerEndpoint(req: express.Request, res: express.Response) {
    let seller = req.body;
    createOrUpdateSeller(req.body, function (err, result) {
        console.log(err);
        console.log(result);
        res.send("Well done! You have inserted into the database.").status(200);
    });


}

function initialisePaypalPayment() {

}

function redirectURL(req: express.Request, res: express.Response) {
    res.status(200).send(req.body);
}

function returnDeliveryStatusFunction(req: express.Request, res: express.Response) {
    //call Mongo to retrieve state of delivery in consignment collection.
    return res.send(retrieveCurrentConsignmentStatus(req.body.orderID)).status(200);
}
function updateDeliveryStatusFunction(req: express.Request, res: express.Response) {
    //call Mongo to update status of delivery in consignment collection.
    return res.send(updateConsignmentStatus(req.body.consignmentUpdatePayload)).status(200);
}


/**
 * Utility function triggers
 */

function populateProductsCollection(req, res) {
    res.status(200).send(createProductsInColl());
}