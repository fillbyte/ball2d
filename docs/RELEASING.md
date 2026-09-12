# Release procedure

GitHub Actions is permanently disabled. An authorized maintainer prepares and
verifies releases locally. The private implementation and this distribution must
agree on the public API, engine/protocol and authenticated service contract.

1. Export a verified runtime from the private implementation. Preserve this
   repository's documentation and review the exact runtime manifest changes.
2. Set the package and runtime-manifest versions together. A release candidate
   uses a prerelease version and the `next` tag; `latest` is reserved for a stable
   release whose production acceptance is complete. Remove `private` only for the
   deliberately reviewed publication candidate.
3. Run the setup checks and inspect `npm pack --dry-run --ignore-scripts`. Pack to
   an external artifact directory, hash the tarball and install that exact tarball
   into a clean consumer. Verify public types and native/browser behavior against
   a matching isolated service; stable acceptance also requires the deployed service.
4. Verify npm identity. Publish the reviewed tarball with the intended tag, then
   check registry integrity/version and a fresh registry installation. Do not
   record tokens or OTPs in Git, documentation, logs or chat.

A dry run is not publication. Old package versions and already downloaded copies
are not overwritten by a new version. Deprecation or withdrawal is a separate
reviewed registry action. Keep release evidence explicit about local, registry and
production results; create the release tag only for the matching final commit.
