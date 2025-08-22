import { writeTypesToFile } from "../dist/src/index.js"

await writeTypesToFile({
    url: "http://127.0.0.1:8090",
    email: "admin@example.com",
    password: "admin@example.com",
    output: "/play/output.ts",
})
