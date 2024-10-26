/** @type {import("prettier").Config & import("@ianvs/prettier-plugin-sort-imports").PluginConfig} */
export default {
    semi: false,
    tabWidth: 4,
    experimentalTernaries: true,
    plugins: ["@ianvs/prettier-plugin-sort-imports"],
}
