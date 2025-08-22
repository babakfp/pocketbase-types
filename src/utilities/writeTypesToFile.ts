import fs from "node:fs/promises"
import path from "node:path"
import * as v from "valibot"
import { createTypes } from "./createTypes.js"
import { getCollections } from "./getCollections.js"
import { Schema } from "./schema.js"

/** Fetches all collections from PocketBase, converts them to TypeScript types, and saves them to a file. */
export const writeTypesToFile = async (options: {
    /** PocketBase URL. */
    url: Schema["url"]
    /** PocketBase admin email. */
    email: Schema["email"]
    /** PocketBase admin password. */
    password: Schema["password"]
    /** Specify the file path to save the types. The path is relative to the current working directory. */
    output: Schema["output"]
}) => {
    const result = v.safeParse(Schema, options)
    if (!result.success) {
        console.log(v.summarize(result.issues))
        process.exit()
    }
    const collections = await getCollections(
        result.output.url,
        result.output.email,
        result.output.password,
    )
    const typesFileContent = createTypes(collections)
    await fs.writeFile(
        path.join(process.cwd(), result.output.output),
        typesFileContent,
    )
}
