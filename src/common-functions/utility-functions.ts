/**
 * Creates a promise with the passed in promiseFunction, eases the binding with the 'then' object.
 */
export async function createAndReturnPromise(promiseFunction) {
    return new Promise(promiseFunction);
}

export function checkIfCollectionExistsAndExecute(resolve, reject, collectionModel, executionFunctionIfCollExists, data, executionFunctionCollNotExists?) {
    collectionModel.db.db.listCollections().toArray(function (err, names) {
        console.log("Collection Names");
        if (names.length === 0) {
            executionFunctionCollNotExists(resolve, reject, data)
        }
        else {
            for (let searchIndex = 0; searchIndex < names.length; searchIndex++) {
                names[searchIndex]["name"] === collectionModel.collection.collectionName ?
                    executionFunctionIfCollExists(resolve, reject, data) :
                    executionFunctionCollNotExists(resolve, reject, data) || console.log("Collection does not exist");
            }
        }

    })
}