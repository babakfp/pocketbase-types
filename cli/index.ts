import dotenv from "dotenv"
import { program } from "commander"
import { writeTypesToFile } from "../src/utilities/writeTypesToFile.js"

program
    .name("pocketbase-auto-generate-types")
    .description("Auto Generate PocketBase Types.")

    .option("-u, --url [url]", "PocketBase URL.")
    .option("-e, --email [email]", "PocketBase admin email.")
    .option("-p, --password [password]", "PocketBase admin password.")
    .option(
        "-o, --output <output>",
        "Specify the file path (relative to the current working directory) to save the types.",
    )
    .option("--env [path]", "Specify the location of the environment file.")

    .helpOption("-h, --help", "Display help for command.")

    .parse()

let { url, email, password, output, env } = program.opts<{
    url?: string
    email?: string
    password?: string
    output?: string
    env?: string
}>()

dotenv.config({ path: env })

url =
    url ?
        process.env[url] || url
    :   process.env["PB_URL"] ||
        process.env["PUBLIC_PB_URL"] ||
        process.env["POCKETBASE_URL"] ||
        process.env["PUBLIC_POCKETBASE_URL"] ||
        "http://127.0.0.1:8090"

email =
    email ?
        process.env[email] || email
    :   process.env["PB_EMAIL"] || process.env["POCKETBASE_EMAIL"]

password =
    password ?
        process.env[password] || password
    :   process.env["PB_PASSWORD"] || process.env["POCKETBASE_PASSWORD"]

if (!url) {
    console.log("Missing PocketBase URL.")
}

if (!email) {
    console.log("Missing PocketBase email.")
}

if (!password) {
    console.log("Missing PocketBase password.")
}

if (!output) {
    console.log("Missing output path.")
}

if (!url || !email || !password || !output) {
    process.exit()
}

await writeTypesToFile(url, email, password, output)
