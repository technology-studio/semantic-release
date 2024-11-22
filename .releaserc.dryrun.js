/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date: 2022-08-21T13:08:66+02:00
 * @Copyright: Technology Studio
**/

module.exports = {
  extends: [
    './src/index.js',
  ],
  branches: [
    process.env.PR_HEAD_REF,
  ],
  dryRun: true,
}
