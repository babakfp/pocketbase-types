import type { CollectionField, CollectionModel } from "pocketbase"
import { getRecordFieldConstantName } from "./getRecordFieldConstantName.js"

export const getCollectionSelectFieldConstantName = (
    collectionName: CollectionModel["name"],
    fieldName: CollectionField["name"],
) => {
    return `${getRecordFieldConstantName(collectionName, fieldName)}_OPTIONS`
}
