import { writeFile } from "node:fs/promises"
import { join } from "node:path"
import * as v from "valibot"
import { createTypes } from "./createTypes.js"
import { getCollections } from "./getCollections.js"
import { Schema } from "./schema.js"

/** Fetches all collections from PocketBase, converts them to TypeScript types, and saves them to a file. */
export const writeTypesToFile = async (options: {
    /** PocketBase URL. */
    url: string
    /** PocketBase admin email. */
    email: string
    /** PocketBase admin password. */
    password: string
    /** Specify the file path to save the types. The path is relative to the current working directory. */
    output: string
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
    await writeFile(join(process.cwd(), result.output.output), typesFileContent)
}
