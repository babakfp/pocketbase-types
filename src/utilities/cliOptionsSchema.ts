import * as v from "valibot"

export const cliOptionsSchema = v.object({
    url: v.optional(v.pipe(v.string(), v.minLength(1))),
    email: v.optional(v.pipe(v.string(), v.minLength(1))),
    password: v.optional(v.pipe(v.string(), v.minLength(1))),
    output: v.pipe(v.string(), v.minLength(1)),
    env: v.optional(v.pipe(v.string(), v.minLength(1))),
})
