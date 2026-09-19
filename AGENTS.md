# Ball2D SDK distribution

This is `fillbyte/ball2d`, the public distribution repository. The private sibling
`ball2d.com` owns implementation source and the SDK build/export pipeline.

- Change runtime behavior in the private implementation; export reviewed compiled
  artifacts and update `runtime-manifest.json`. Do not hand-edit bundled runtime.
- Distribute only reviewed runtime files, public declarations, docs and examples.
  Exclude implementation source, internal declarations, source maps, development
  fixtures and credentials. Executable code remains inspectable.
- Native admission requires API keys and service-enforced session quotas; no
  anonymous fallback. Keep the candidate package private until service readiness
  and the exact publish archive are verified. Publication requires explicit intent.
- GitHub Actions is permanently disabled; do not enable, trigger or add workflows,
  including after a quota reset. Run applicable checks locally.

Use [README.md](README.md) for public API/release status and
[CONTRIBUTING.md](CONTRIBUTING.md) for the distribution boundary. For runtime or
package changes, run `npm run check` and inspect
`npm pack --dry-run --ignore-scripts`. Documentation-only edits need relevant
link/format checks. Continue authorized local verification and fixes without
repeated approval; distinguish package checks from authenticated live acceptance.
