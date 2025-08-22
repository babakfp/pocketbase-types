import path from "node:path"
import * as v from "valibot"

export const Schema = v.object({
    url: v.pipe(v.string(), v.url()),
    email: v.pipe(v.string(), v.email()),
    password: v.pipe(v.string(), v.minLength(1)),
    output: v.pipe(v.string(), v.minLength(1)),
})

export const CLISchema = v.object({
    url: v.optional(Schema.entries.url),
    email: v.optional(Schema.entries.email),
    password: v.optional(Schema.entries.password),
    output: v.optional(
        Schema.entries.output,
        path.join(process.cwd(), "pocketbase-types.ts"),
    ),
    env: v.optional(v.pipe(v.string(), v.minLength(1))),
})
