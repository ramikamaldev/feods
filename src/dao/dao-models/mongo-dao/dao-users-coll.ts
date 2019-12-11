import { usersModel } from "../mongo-schemas/feods-users-coll-schema"
import { checkIfCollectionExistsAndExecute } from "../../../common-functions/utility-functions"

export function createOrUpdateOrRetreieveUser(usersEmailAddress) {
   console.log("Executing addUser to database.");
    let createDocument = function (resolve, reject, usersEmailAddress) {
        console.log("Executing createDocument Function!")
        usersModel.create(usersEmailAddress).then(
            function (response) {
                console.log("Resolving createDocument Function");
                return resolve(response);
            }).catch(
                function (err) {
                    console.log("CreateDocument - createAndOrRetrieveUser:", err);
                    reject(err);
                })
    };
    let findOrUpdateDocument = function (resolve, reject, usersEmailAddress) {
        console.log("Executing findOrUpdateDocument function.")
        usersModel.findOneAndUpdate({ usersEmail: usersEmailAddress }, { $set: { usersEmailAddress } }, { upsert: true }).then(
            function (response) {
                console.log("Resolving findOrUpdateDocument Function");
                return resolve(response);
            }).catch(
                function (err) {
                    console.log("FindOrUpdateDocument - createAndOrRetrieveUser:", err);
                    reject(err);
                })
    }
    return new Promise(function (resolve, reject) {
        console.log("Calling checkIfCollectionExists Promise");
        checkIfCollectionExistsAndExecute(resolve, reject, usersModel, findOrUpdateDocument, usersEmailAddress, createDocument);
    })
}

export function findUserByID(findUserPayloadJSON) {
    usersModel.findOne({ userEmail: findUserPayloadJSON.userEmail }, function (err, result) {
        return result;
    })
}