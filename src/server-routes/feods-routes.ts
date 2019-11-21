import express from "express";

export function createAndReturnFeodsRouter() {
    let router = express.Router();
    router.use("/happy", rootFunction);
    router.use("/order-delivery-status", returnDeliveryStatusFunction);

    //Protect these endpoints. 
    router.use("/update-order-delivery-status", updateDeliveryStatusFunction);
    router.use("create-new-order", createNewOrderFunction);
    return router;
}

function rootFunction(req: express.Request, res: express.Response) {
    res.status(200).send("hi :)");

}
function returnDeliveryStatusFunction(req: express.Request, res: express.Response) {
    //call Mongo to retrieve state of delivery in consignment collection.

}
function updateDeliveryStatusFunction(req: express.Request, res: express.Response) {
    //call Mongo to update status of delivery in consignment collection.

}
function createNewOrderFunction(req: express.Request, res: express.Response) {
    //Call Mongo create new entry in consignment collection.

}

