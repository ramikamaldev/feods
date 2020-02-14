function addItemToLocalStorage(itemJSON) {
    console.log(itemJSON);
    if (localStorage.getItem(cart) === null) {
        localStorage.setItem("cart", "")
    }
    let cart = localStorage.getItem("cart")
    cart = cart.split(",").push({ "productId": itemJSON["productId"], "quantity": itemJSON})
}

function sendData(data) {
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var XHR = new XMLHttpRequest();
    XHR.addEventListener('load', function (event) {
        console.log('Yeah! Data sent and response loaded.');
    });

    XHR.addEventListener('error', function (event) {
        console.log('Oops! Something goes wrong.');
    });

    XHR.open('POST', 'http://localhost:5050/happy');

    XHR.setRequestHeader("Content-Type", "application/json");

    XHR.send(JSON.stringify(data));
}