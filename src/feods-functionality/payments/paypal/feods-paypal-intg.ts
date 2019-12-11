import * as paypal from "paypal-rest-sdk";
import { returnPaypalCreateJSON, returnPaypalExecuteJSON } from "./transaction-transformation"

function configurePaypall() {
    paypal.configure({
        'mode': 'sandbox', //sandbox or live
        'client_id': process.env.FEODS_PAYPAL_SANDBOX_CLIENT_ID,
        'client_secret': process.env.FEODS_PAYPAL_SANDBOX_CLIENT_SECRET
    });
}

export function createPaypalPayment(consignmentOrderJSON) {
    let create_payment_json: any = returnPaypalCreateJSON(consignmentOrderJSON);
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("Create Payment Response");
            console.log(payment);
        }
    });
}

export function executePaypalPayment(paymentID) {
    let execute_payment_json = returnPaypalExecuteJSON();
    paypal.payment.execute(paymentID, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
        }
    });
}

function retrievePaypalPayment(paymentID) {
    paypal.payment.get(paymentID, function (error, payment) {
        if (error) {
            console.log(error);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
        }

    });
}