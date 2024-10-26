import { writeFile } from "node:fs/promises"
import { join } from "node:path"
import { createTypes } from "./createTypes.js"
import { getCollections } from "./getCollections.js"

/**
 * Fetches all collections from PocketBase, converts them to TypeScript types, and saves them to a file.
 * @param url PocketBase URL.
 * @param email PocketBase admin email.
 * @param password PocketBase admin password.
 * @param output Specify the file path to save the types. The path is relative to the current working directory.
 */
export const writeTypesToFile = async (
    url: string,
    email: string,
    password: string,
    output: string,
) => {
    const collections = await getCollections(url, email, password)
    const typesFileContent = createTypes(collections)
    await writeFile(join(process.cwd(), output), typesFileContent)
}
