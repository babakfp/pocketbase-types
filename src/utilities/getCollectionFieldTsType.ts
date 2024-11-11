import type { CollectionModel, SchemaField } from "pocketbase"
import { getRecordFieldConstantName } from "./getRecordFieldConstantName.js"

export const getCollectionFieldTsType = (
    collection: CollectionModel,
    field: SchemaField,
) => {
    if (field.type === "date") {
        return "string"
    }

    if (field.type === "text") {
        return "string"
    }

    if (field.type === "email") {
        return "string"
    }

    if (field.type === "url") {
        return "string"
    }

    if (field.type === "editor") {
        return "string"
    }

    if (field.type === "number") {
        return "number"
    }

    if (field.type === "bool") {
        return "boolean"
    }

    if (field.type === "json") {
        return ["unknown", "null"].join(" | ")
    }

    if (field.type === "file") {
        return field.options.maxSelect === 1 ? "string" : "string[]"
    }

    if (field.type === "relation") {
        return field.options.maxSelect === 1 ? "string" : "string[]"
    }

    if (field.type === "select") {
        const type = `keyof typeof ${getRecordFieldConstantName(collection.name, field.name)}_OPTIONS`
        return field.options.maxSelect === 1 ? type : `(${type})[]`
    }

    return "unknown"
}
