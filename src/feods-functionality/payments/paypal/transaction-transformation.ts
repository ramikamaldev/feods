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
    // let createConsignmentOrder = {
    //     "products": {"obj":"req"}
    //     "orderId": "string req rand"
    //     "userId": { "string req email" },
    //     "consignmentId": "string req rand"
    //     "deliveryLocation": [lat, long],
    //     "senderLocation": [lat, long],
    //     "consignmentStateUpdated": [date, date],
    //     "consignmentEntryCreated": [date],
    //     "state": {
    //         type: String,
    //         enum: ['processing_order', 'order_accepted', 'order_rejected', 'being_prepared', 'shipped', 'out_for_delivery', 'delivered', 'order_cancelled',
    //             "en_route_to_sender", "waiting_at_sender", "en_route_to_recipient", "delivered", "unsuccesful"],
    //         default: 'order_accepted'
    //     }
    // };
    let createPaymentJSON = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "transactions": [{
            "amount": {
                "total": "30.11",
                "currency": "USD",
                "details": {
                    "subtotal": "30.00",
                    "tax": "0.07",
                    "shipping": "0.03",
                    "handling_fee": "1.00",
                    "shipping_discount": "-1.00",
                    "insurance": "0.01"
                }
            },
            "description": "This is the payment transaction description.",
            "custom": "EBAY_EMS_90048630024435",
            "invoice_number": "48787589673",
            "payment_options": {
                "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
            },
            "soft_descriptor": "ECHI5786786",
            "item_list": {
                "items": [{
                    "name": "hat",
                    "description": "Brown color hat",
                    "quantity": "5",
                    "price": "3",
                    "tax": "0.01",
                    "sku": "1",
                    "currency": "USD"
                }, {
                    "name": "handbag",
                    "description": "Black color hand bag",
                    "quantity": "1",
                    "price": "15",
                    "tax": "0.02",
                    "sku": "product34",
                    "currency": "USD"
                }],
                "shipping_address": {
                    "recipient_name": "Hello World",
                    "line1": "4thFloor",
                    "line2": "unit#34",
                    "city": "SAn Jose",
                    "country_code": "US",
                    "postal_code": "95131",
                    "phone": "011862212345678",
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

function transformPaypalExecuteJSON() {

}
