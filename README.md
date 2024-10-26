# PocketBase Auto Generate Types

Auto Generate PocketBase Types.

## Install

```bash
pnpm add -D pocketbase-auto-generate-types
```

## How to use

### CLI

-   `-u`, `--url <url>` - PocketBase URL. Default: `PB_URL`, `PUBLIC_PB_URL`, `POCKETBASE_URL`, `PUBLIC_POCKETBASE_URL`, `"http://127.0.0.1:8090"`.
-   `-e`, `--email <email>` - PocketBase admin email. Default: `PB_EMAIL`, `POCKETBASE_EMAIL`.
-   `-p`, `--password <password>` - PocketBase admin password. Default: `PB_PASSWORD`, `POCKETBASE_PASSWORD`.
-   `-o`, `--output <output>` - Specify the file path to save the types. The path is relative to the current working directory.
-   `--env` - When enabled, the PocketBase URL, email, and password will be read from environment variables.
-   `-h`, `--help` - Display help for command.

```bash
pnpm pocketbase-auto-generate-types -u http://127.0.0.1:8090 -e admin_email -p admin_password -o types.ts
```

#### Environment Variables

Place the name of the environment variable in front of the flags. You can name the environment variable whatever you want.

```bash
pnpm pocketbase-auto-generate-types --env -u http://127.0.0.1:8090 -e ADMIN_EMAIL -p ADMIN_PASSWORD -o types.ts
```

### Function

```ts
import { writeTypesToFile } from "pocketbase-auto-generate-types"

await writeTypesToFile(
    "http://127.0.0.1:8090",
    "ADMIN EMAIL",
    "ADMIN PASSWORD",
    "types.ts",
)
```

## Auto Generate Types

This will need a bit of work to set it up.

In the root folder that you have the `pocketbase.exe` file, create `pb_hooks/main.pb.js`. Add the below content inside it. Change the placeholder URL to your app's URL and endpoint.

```js
/// <reference path="../pb_data/types.d.ts" />

onCollectionAfterCreateRequest(() => {
    const { sendTypesUpdateRequest } = require(
        `${__hooks}/sendTypesUpdateRequest.cjs`,
    )
    sendTypesUpdateRequest(
        "http://localhost:5173/pocketbase-auto-generate-types",
    )
})

onCollectionAfterUpdateRequest(() => {
    const { sendTypesUpdateRequest } = require(
        `${__hooks}/sendTypesUpdateRequest.cjs`,
    )
    sendTypesUpdateRequest(
        "http://localhost:5173/pocketbase-auto-generate-types",
    )
})

onCollectionAfterDeleteRequest(() => {
    const { sendTypesUpdateRequest } = require(
        `${__hooks}/sendTypesUpdateRequest.cjs`,
    )
    sendTypesUpdateRequest(
        "http://localhost:5173/pocketbase-auto-generate-types",
    )
})
```

Do the same for `pb_hooks/sendTypesUpdateRequest.cjs`.

```js
/// <reference path="../pb_data/types.d.ts" />

/**
 * @param {string} url
 */
const sendTypesUpdateRequest = (url) => {
    try {
        $http.send({
            url: url,
            timeout: 30,
            method: "POST",
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    sendTypesUpdateRequest,
}
```

This is going to send a HTTP request to your app, letting you know that types neeed to be updated.

In your app, you need to have an endpoint that will receive the request and update the types using the `pocketbase-auto-generate-types` package.

Example how it's done in SvelteKit:

`src/routes/pocketbase-auto-generate-types/+server.ts`:

```ts
import {
    POCKETBASE_ADMIN_EMAIL,
    POCKETBASE_ADMIN_PASSWORD,
} from "$env/static/private"
import { PUBLIC_POCKETBASE_URL } from "$env/static/public"
import { writeTypesToFile } from "pocketbase-auto-generate-types"

export const POST = async () => {
    const OUTPUT_PATH = "/src/lib/pocketbase-auto-generated-types.ts"

    await writeTypesToFile(
        PUBLIC_POCKETBASE_URL,
        POCKETBASE_ADMIN_EMAIL,
        POCKETBASE_ADMIN_PASSWORD,
        OUTPUT_PATH,
    )

    return ""
}
```

`src/routes/pocketbase-auto-generate-types/+page.server.ts`

```ts
export const actions = {
    default: async ({ fetch }) => {
        await fetch("/pocketbase-auto-generate-types")
    },
}
```

`src/routes/+layout.svelte`:

```svelte
<script lang="ts">
    import { onDestroy, onMount } from "svelte"
    import { enhance } from "$app/forms"
    import { pb } from "$lib/stores/pb"

    let formElement: HTMLFormElement

    onMount(async () => {
        await $pb.realtime.subscribe("PB_CONNECT", async () => {
            formElement.requestSubmit()
        })
    })

    onDestroy(async () => {
        await $pb.realtime.unsubscribe("PB_CONNECT")
    })
</script>

<form
    use:enhance
    method="post"
    action="/pocketbase-auto-generate-types"
    bind:this={formElement}
/>
```

> [!IMPORTANT]
> Make sure to only run this on a development environment.
