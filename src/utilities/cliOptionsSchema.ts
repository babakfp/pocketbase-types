import { minLength, object, optional, pipe, string } from "valibot"

export const cliOptionsSchema = object({
    url: optional(pipe(string(), minLength(1))),
    email: optional(pipe(string(), minLength(1))),
    password: optional(pipe(string(), minLength(1))),
    output: pipe(string(), minLength(1)),
    env: optional(pipe(string(), minLength(1))),
})
