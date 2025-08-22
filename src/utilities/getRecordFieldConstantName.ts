import type { CollectionField, CollectionModel } from "pocketbase"
import { toUpperSnakeCase } from "../helpers/toCase.js"

export const getRecordFieldConstantName = (
    collectionName: CollectionModel["name"],
    fieldName: CollectionField["name"],
) => {
    return `${toUpperSnakeCase(collectionName)}_RECORD_${toUpperSnakeCase(fieldName)}`
}
