/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2026-07-29T00:00:00+02:00
 * @Copyright: Technology Studio
**/

const assert = require('node:assert')

// The @semantic-release/git plugin used to be added conditionally on this
// variable, so simulate the release branch to guard against regressions.
process.env.GITHUB_REF_NAME = 'main'

const config = require('../src/index.js')

const pluginNames = config.plugins.map(
  (plugin) => Array.isArray(plugin) ? plugin[0] : plugin,
)

assert.ok(
  !pluginNames.includes('@semantic-release/changelog'),
  '@semantic-release/changelog must not be configured',
)
assert.ok(
  !pluginNames.includes('@semantic-release/git'),
  '@semantic-release/git must not be configured',
)
assert.deepStrictEqual(pluginNames, [
  '@semantic-release/commit-analyzer',
  '@semantic-release/release-notes-generator',
  'semantic-release-slack-bot',
  '@semantic-release/npm',
  '@semantic-release/github',
])
const githubPlugin = config.plugins.find(
  (plugin) => (Array.isArray(plugin) ? plugin[0] : plugin) === '@semantic-release/github',
)

assert.ok(
  Array.isArray(githubPlugin),
  '@semantic-release/github must be configured with options',
)
assert.strictEqual(
  githubPlugin[1].successCommentCondition, false,
  'github success comments must be disabled (no issues/pull-requests write permission)',
)
assert.strictEqual(
  githubPlugin[1].failCommentCondition, false,
  'github failure issues/comments must be disabled (no issues write permission)',
)

assert.deepStrictEqual(config.branches, [
  '+([0-9])?(.{+([0-9]),x}).x',
  'main',
  'next',
  'next-major',
  { name: 'beta', prerelease: true },
  { name: 'alpha', prerelease: true },
])

console.log('semantic-release configuration checks passed')
