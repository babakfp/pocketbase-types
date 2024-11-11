import type { CollectionModel, SchemaField } from "pocketbase"
import { getRecordFieldConstantName } from "./getRecordFieldConstantName.js"

export const getCollectionSelectFieldConstantName = (
    collectionName: CollectionModel["name"],
    fieldName: SchemaField["name"],
) => {
    return `${getRecordFieldConstantName(collectionName, fieldName)}_OPTIONS`
}
