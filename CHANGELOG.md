## 3.0.0

- chore!: `writeTypesToFile` now takes a single argument as a options object.
- feat: support latest version of pocketbase `v0.29.2`.
- fix: use `Object.freeze` instead of `as const`.
- chore: better schema validation.

## 2.1.0

- New: Added `COLLECTIONS` constant.

## 2.0.0

- Breaking: Added the `_OPTIONS` suffix to the variable name of constans of the `select` fields.
- Breaking: `"json"` fields type is now `unknown` only.
- Fix: Fixed a bug where the multi-select `file` and `relation` and `select` fields type was not being generated correctly.
- Fix: Property convert a camelCase string to UPPER_SNAKE_CASE.
- New: Added `file` fields mime types and constants.
