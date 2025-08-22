import * as v from "valibot"

export const cliOptionsSchema = v.object({
    url: v.optional(v.pipe(v.string(), v.url())),
    email: v.optional(v.pipe(v.string(), v.email())),
    password: v.optional(v.pipe(v.string(), v.minLength(1))),
    output: v.pipe(v.string(), v.minLength(1)),
    env: v.optional(v.pipe(v.string(), v.minLength(1))),
})
