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

const options = program.opts<{
    url?: string
    email?: string
    password?: string
    output?: string
    env?: true | string
}>()

if (options.env) {
    dotenv.config({
        path: typeof options.env === "string" ? options.env : undefined,
    })
}

options.url = options.env ? process.env[String(options.url)] : options.url
options.email = options.env ? process.env[String(options.email)] : options.email
options.password = options.env
    ? process.env[String(options.password)]
    : options.password

if (!options.url)
    console.log(
        options.env
            ? "The environment variable for PocketBase URL is missing or invalid."
            : "Missing PocketBase URL.",
    )
if (!options.email)
    console.log(
        options.env
            ? "The environment variable for PocketBase email is missing or invalid."
            : "Missing PocketBase email.",
    )
if (!options.password)
    console.log(
        options.env
            ? "The environment variable for PocketBase password is missing or invalid."
            : "Missing PocketBase password.",
    )
if (!options.output) console.log("Missing output path.")

if (!options.url || !options.email || !options.password || !options.output) {
    process.exit()
}

await writeTypesToFile(
    options.url,
    options.email,
    options.password,
    options.output,
)
