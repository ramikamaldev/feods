import express from "express";
import { createConsignmentOrder, retrieveCurrentConsignmentStatus, updateConsignmentStatus } from "../dao/dao-models/mongo-dao/dao-consignment-coll"
import {parse,stringify} from "flatted/cjs"

export function createAndReturnFeodsRouter() {
    let router = express.Router();
    router.use("/happy", rootFunction);
    router.use("/order-delivery-status", returnDeliveryStatusFunction);
    //Protect these endpoints. 
    router.use("/update-order-delivery-status", updateDeliveryStatusFunction);
    router.use("/create-new-order", createNewOrderFunction);
    router.use("/redirect-url", redirectURL);
    return router;
}

function rootFunction(req: express.Request, res: express.Response) {
    res.status(200).send("hi, happy :)");
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
function createNewOrderFunction(req: express.Request, res: express.Response) {
    //Call Mongo create new entry in consignment collection.
    return res.send(createConsignmentOrder(req.body.consignmentCreationPayload)).status(200);
}

