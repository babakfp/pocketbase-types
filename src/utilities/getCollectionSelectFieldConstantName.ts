import type { CollectionModel, SchemaField } from "pocketbase"

export const getCollectionSelectFieldConstantName = (
    collectionName: CollectionModel["name"],
    fieldName: SchemaField["name"],
) => {
    return `${collectionName.toUpperCase()}_RECORD_${fieldName.toUpperCase()}`
}
