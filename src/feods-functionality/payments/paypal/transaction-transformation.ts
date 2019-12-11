import { calculateTotalCost } from "../../../common-functions/monetary-functions"
import cryptoRandomString = require('crypto-random-string');

export function returnPaypalCreateJSON(consignmentOrder) {
    let createPaymentJSON = transformConsignmentOrderToJSON(consignmentOrder);
    return createPaymentJSON;
}

export function returnPaypalExecuteJSON() {
    let executePaymentJSON = transformPaypalExecuteJSON();
    let execute_payment_json = {
        "payer_id": "Appended to redirect url",
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "1.00"
            }
        }]
    };
    return execute_payment_json;
}

function transformConsignmentOrderToJSON(consignmentOrder) {
    let items = createItemsListFromProducts(consignmentOrder.products)
    let createPaymentJSON = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "transactions": [{
            "amount": {
                "total": calculateTotalCost(consignmentOrder.subTotal),
                "currency": consignmentOrder.currency,
                "details": {
                    "subtotal": consignmentOrder.totalPrice,
                    "tax": consignmentOrder.taxRate,
                    "shipping": consignmentOrder.shipping,
                    "handling_fee": consignmentOrder.handlingFee,
                    "shipping_discount": consignmentOrder.shippingDiscount,
                    "insurance": consignmentOrder.insurance
                }
            },
            "description": `Feods Order - Order Number:${consignmentOrder.orderId}`,
            "custom": `FEODS_ARR_${cryptoRandomString({ length: 10, characters: "FEODSARR12" })}`,
            "invoice_number": cryptoRandomString({ length: 15, characters: 'FEODS12345' }),
            "payment_options": {
                "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
            },
            "soft_descriptor": "ECHI5786786",
            "item_list": {
                "items": items,
                "shipping_address": {
                    "recipient_name": consignmentOrder.user.userName,
                    "line1": "4thFloor",
                    "line2": "unit#34",
                    "city": "SAn Jose",
                    "country_code": "US",
                    "postal_code": "95131",
                    "phone": consignmentOrder.user.userPhoneNumber,
                    "state": "CA"
                }
            }
        }],
        "note_to_payer": "Contact us for any questions on your order.",
        "redirect_urls": {
            "return_url": "https://feods.azurewebsites.net/redirect-url",
            "cancel_url": "https://example.com"
        }
    };


}

function createItemsListFromProducts(productList) {

}

function transformPaypalExecuteJSON() {

}
