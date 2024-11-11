import type { CollectionModel } from "pocketbase"
import { toPascalCase } from "../helpers/toPascalCase.js"
import { getCollectionFieldTsType } from "./getCollectionFieldTsType.js"
import { getCollectionSelectFieldConstantName } from "./getCollectionSelectFieldConstantName.js"

const createCollectionRecord = () => {
    const types: string[] = []

    const add = (c: CollectionModel) => {
        const props: string[] = []
        const selectConstantProperties: string[] = []

        c.schema.forEach((field) => {
            const name = field.name
            const required = field.required ? "" : "?"
            const type = getCollectionFieldTsType(c, field)

            props.push(`    ${name}${required}: ${type}`)

            if (field.type === "select") {
                selectConstantProperties.push(
                    [
                        `export const ${getCollectionSelectFieldConstantName(c.name, name)} = {`,
                        field.options.values
                            .map(
                                (value: string) =>
                                    `    ${JSON.stringify(value)}: "${value}",`,
                            )
                            .join("\n"),
                        "} as const",
                    ].join("\n"),
                )
            }
        })

        const collectionName = toPascalCase(c.name)

        if (selectConstantProperties.length) {
            types.push(selectConstantProperties.join("\n\n"))
        }

        types.push(
            [`export type ${collectionName}Record = {`, ...props, "}"].join(
                "\n",
            ),
        )
    }

    const get = () => {
        return types.join("\n\n")
    }

    return { add, get }
}

const createCollectionRecords = () => {
    const types: string[] = []

    const add = (c: CollectionModel) => {
        types.push(`    ${c.name}: ${toPascalCase(c.name)}Record`)
    }

    const get = () => {
        return ["export type CollectionRecords = {", ...types, "}"].join("\n")
    }

    return { add, get }
}

const createCollectionResponse = () => {
    let types: string[] = []

    const add = (collection: CollectionModel) => {
        const name = toPascalCase(collection.name)
        const model =
            collection.type === "auth" ? "AuthModel"
            : collection.type === "view" ? "ViewModel"
            : "RecordModel"

        types.push(
            `export type ${name}Response<TExpand = unknown> = Required<${name}Record> & ${model}<TExpand>`,
        )
    }

    const get = () => {
        return types.join("\n")
    }

    return { add, get }
}

const createCollectionResponses = () => {
    const types: string[] = []

    const add = (c: CollectionModel) => {
        types.push(`    ${c.name}: ${toPascalCase(c.name)}Response`)
    }

    const get = () => {
        return ["export type CollectionResponses = {", ...types, "}"].join("\n")
    }

    return { add, get }
}

const createPocketbaseType = () => {
    let types: string[] = []

    const add = (collection: CollectionModel) => {
        const name = toPascalCase(collection.name)

        types.push(
            `    collection<TExpand = unknown>(idOrName: "${collection.name}"): RecordService<${name}Response<TExpand>>`,
        )
    }

    const get = () =>
        ["export type PocketBaseType = PocketBase & {", ...types, "}"].join(
            "\n",
        )

    return { add, get }
}

export const createTypes = (collections: CollectionModel[]) => {
    const allTypes = [
        `/*
    NOTE: This file is auto-generated by https://www.npmjs.com/package/pocketbase-types.
    IMPORTANT: Do not edit this file manually.
*/

import type PocketBase from "pocketbase"
import type { RecordService } from "pocketbase"

export type BaseModel = {
    id: string
    created: string
    updated: string
}

export type ViewModel = {
    id: string
    collectionId: string
    collectionName: string
}

export type RecordModel<T = never> = BaseModel & {
    collectionId: string
    collectionName: string
    expand?: T
}

export type AuthModel<T = never> = RecordModel<T> & {
    username: string
    email: string
    emailVisibility: boolean
    verified: boolean
}`,
    ]

    const collectionRecord = createCollectionRecord()
    const collectionRecords = createCollectionRecords()
    const collectionResponse = createCollectionResponse()
    const collectionResponses = createCollectionResponses()
    const pocketbaseType = createPocketbaseType()

    collections.forEach((collection) => {
        collectionRecord.add(collection)
        collectionRecords.add(collection)
        collectionResponse.add(collection)
        collectionResponses.add(collection)
        pocketbaseType.add(collection)
    })

    allTypes.push(collectionRecord.get())
    allTypes.push(collectionRecords.get())
    allTypes.push(collectionResponse.get())
    allTypes.push(collectionResponses.get())
    allTypes.push(pocketbaseType.get())

    return allTypes.join("\n\n") + "\n"
}
