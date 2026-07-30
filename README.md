![npm](https://img.shields.io/npm/v/@txo/semantic-release)
![codecov](https://img.shields.io/codecov/c/github/technology-studio/semantic-release)
# Semantic release #

Semantic release

## Release process ##

Releases are fully automated by [semantic-release](https://github.com/semantic-release/semantic-release) running in GitHub Actions on pushes to `main`. The next version is calculated from Conventional Commits and Git tags. The release:

- publishes the correctly versioned package to npm (via OIDC trusted publishing),
- creates the Git tag and the GitHub Release with generated release notes,
- sends Slack notifications.

No release commit is pushed back to the repository. The `version` field committed in `package.json` is not the released version; the authoritative released versions are the Git tags, [GitHub Releases](https://github.com/technology-studio/semantic-release/releases) and the npm registry. `@semantic-release/npm` writes the calculated version into `package.json` in the CI workspace during preparation, so the published package is versioned correctly without committing the change.

## Emergency local release ##

If GitHub Actions is unavailable, an authorised maintainer can release locally:

```bash
npx semantic-release --no-ci
```

Run it only:

- from the intended release branch,
- from a clean working tree,
- after `git fetch --tags origin` and pulling the latest remote state,
- after all required tests pass (`bun run test`),
- with the supported Bun version (see `.bun-version`) and Node version (see `.nvmrc`),
- with valid GitHub (`GITHUB_TOKEN`) and npm credentials, and `SLACK_WEBHOOK` for notifications,
- if you are authorised to publish the package.

semantic-release calculates the version from Git history and tags and temporarily updates `package.json` in the local workspace before publishing. Do not commit the generated version.

**Recovery warning:**

- Do not run plain `npm publish` from a checkout — it would publish the placeholder or a stale version.
- Do not manually create a version or tag that conflicts with the semantic-release history.
- After a partial failure, verify the state of npm, Git tags and GitHub Releases before retrying.
