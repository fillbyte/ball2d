# SDK repository setup

Use Node.js 24 or newer and npm. This repository contains reviewed runtime
artifacts and public contracts; implementation changes belong in the private game
repository. Cloning it requires no sibling checkout, browser process or build step.

```sh
npm ci
npm run check
npm run check:docs
npm run format:check
npm run pack:check
```

The checks verify declared artifacts, runtime hashes, WebAssembly compilation,
SDK imports and rejection of missing native credentials without allocating a room.
They do not authenticate with the production service. Formatting excludes bundled
runtime files; regenerate those through the private build/export pipeline.

For an integration, install the documented package version into your own project,
set BALL2D_API_KEY through your secret manager, and use the example in the README.
The runtime's dependencies are bundled; development tooling is not required by
package consumers. Do not place credentials in package scripts or committed files.

See [release procedure](RELEASING.md) for exact-archive publication and
[contribution guidance](../CONTRIBUTING.md) for scope.
