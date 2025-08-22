import PocketBase from "pocketbase"
import { sortAlphabetically } from "../helpers/sortAlphabetically.js"

/**
 * Fetches all collections from PocketBase.
 * @param url PocketBase URL.
 * @param email PocketBase admin email.
 * @param password PocketBase admin password.
 */
export const getCollections = async (
    url: string,
    email: string,
    password: string,
) => {
    const pb = new PocketBase(url)

    await pb.collection("_superusers").authWithPassword(email, password)

    const collections = await pb.collections.getFullList()

    const collectionTypesInSortOrder = ["auth", "base", "view"]

    const sortedCollections = collectionTypesInSortOrder.flatMap((type) =>
        collections
            .filter((c) => c.type === type)
            .sort((a, b) => sortAlphabetically(a.name, b.name)),
    )

    return sortedCollections
}
