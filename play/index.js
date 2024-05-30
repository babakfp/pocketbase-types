import { writeTypesToFile } from "../dist/src/index.js"

const url = "http://127.0.0.1:8090"
const email = "admin@example.com"
const password = "admin@example.com"

await writeTypesToFile(url, email, password, "/play/output.ts")
