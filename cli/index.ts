import dotenv from "dotenv"
import { program } from "commander"
import { writeTypesToFile } from "../src/utilities/writeTypesToFile.js"

program
    .name("pocketbase-auto-generate-types")
    .description("Auto Generate PocketBase Types.")

    .option("-u, --url <url>", "PocketBase URL.")
    .option("-e, --email <email>", "PocketBase admin email.")
    .option("-p, --password <password>", "PocketBase admin password.")
    .option(
        "-o, --output <output>",
        "Specify the file path to save the types. The path is relative to the current working directory.",
    )
    .option(
        "--env [path]",
        "Enable this option to read the PocketBase URL, email, and password from environment variables. The optional 'path' parameter allows you to specify the location of the environment file.",
    )

    .helpOption("-h, --help", "Display help for command.")

    .parse()

const o = program.opts<{
    url?: string
    email?: string
    password?: string
    output?: string
    env?: true | string
}>()

if (o.env) {
    dotenv.config({
        path: typeof o.env === "string" ? o.env : undefined,
    })
}

o.url = o.env
    ? o.url
        ? process.env[o.url]
        : process.env["PB_URL"] ||
          process.env["PUBLIC_PB_URL"] ||
          process.env["POCKETBASE_URL"] ||
          process.env["PUBLIC_POCKETBASE_URL"] ||
          "http://127.0.0.1:8090"
    : o.url

o.email = o.env
    ? o.email
        ? process.env[o.email]
        : process.env["PB_EMAIL"] || process.env["POCKETBASE_EMAIL"]
    : o.email

o.password = o.env
    ? o.password
        ? process.env[o.password]
        : process.env["PB_PASSWORD"] || process.env["POCKETBASE_PASSWORD"]
    : o.password

if (!o.url) {
    console.log(
        o.env
            ? "The environment variable for PocketBase URL is missing or invalid."
            : "Missing PocketBase URL.",
    )
}

if (!o.email) {
    console.log(
        o.env
            ? "The environment variable for PocketBase email is missing or invalid."
            : "Missing PocketBase email.",
    )
}

if (!o.password) {
    console.log(
        o.env
            ? "The environment variable for PocketBase password is missing or invalid."
            : "Missing PocketBase password.",
    )
}

if (!o.output) {
    console.log("Missing output path.")
}

if (!o.url || !o.email || !o.password || !o.output) {
    process.exit()
}

await writeTypesToFile(o.url, o.email, o.password, o.output)
