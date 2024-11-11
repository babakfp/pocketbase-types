import { pascalCase, snakeCase } from "change-case"

export const toPascalCase = (v: string) => pascalCase(v)

export const toUpperSnakeCase = (v: string) => snakeCase(v).toUpperCase()
