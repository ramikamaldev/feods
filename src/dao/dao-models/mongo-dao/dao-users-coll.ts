import { usersModel } from "../mongo-schemas/feods-users-coll-schema"

export function createOrUpdateUser(findUserPayloadJSON) {
    usersModel.findOneAndUpdate({ findUserPayloadJSON }, { upsert: true }, function (err, result) {
        return result;
    })
}

export function findUserByID(findUserPayloadJSON) {
    usersModel.findOne({ userEmail: findUserPayloadJSON.userEmail }, function (err, result) {
        return result;
    })
}