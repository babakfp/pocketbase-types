import type { CollectionModel, SchemaField } from "pocketbase"
import { toUpperSnakeCase } from "../helpers/toCase.js"

export const getRecordFieldConstantName = (
    collectionName: CollectionModel["name"],
    fieldName: SchemaField["name"],
) => {
    return `${toUpperSnakeCase(collectionName)}_RECORD_${toUpperSnakeCase(fieldName)}`
}
