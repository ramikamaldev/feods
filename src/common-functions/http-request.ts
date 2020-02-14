import * as request from 'request';

/**
 * Executes the HTTP request.
 */
export async function createAndExecuteHTTPRequest(httpEndpoints, callback) {
    return new Promise(function (resolve, reject) {
        let httpEndpointsPayload = [];
        let numberOfRequests = 0;
        for (let forLoopIteration = 0; forLoopIteration <= httpEndpoints.length;) {
            let requestOptions: string = returnRequestParameters(httpEndpoints[numberOfRequests]);
            if (numberOfRequests <= httpEndpoints.length) { //0 - 1
                request(JSON.parse(requestOptions))
                    .then(function (body) {
                        httpEndpointsPayload.push({ body });
                        numberOfRequests++;
                        if (numberOfRequests === httpEndpoints.length) {
                            return resolve(httpEndpointsPayload);
                        }
                    })
                    .catch(function (err) {
                        numberOfRequests++;
                        console.log(err);
                    });
            }
            else {
                break;
            }
            forLoopIteration++;
        }

    })
}

function returnRequestParameters(httpEndpoint) {
    delete httpEndpoint["_id"];
    let requestOptions = JSON.stringify({
        method: httpEndpoint["method"],
        uri: httpEndpoint["uri"],
        form: (httpEndpoint["form"] ? httpEndpoint["form"] : null),
        headers: (httpEndpoint["content-type"] ? { "Content-Type": "application/json" } : null),
        ca: (httpEndpoint["ca"] ? httpEndpoint["ca"] : null),
        cert: (httpEndpoint["cert"] ? httpEndpoint["cert"] : null),
        key: (httpEndpoint["key"] ? httpEndpoint["key"] : null),
        passphrase: (httpEndpoint["passphrase"] ? httpEndpoint["passphrase"] : null),
        qs: (httpEndpoint["qs"] ? httpEndpoint["qs"] : null)
    });
    return requestOptions;
}