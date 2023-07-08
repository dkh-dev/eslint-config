'use strict'

const { ESLint } = require('eslint')
const { readFile } = require('fs/promises')

const normalizeRuleIds = (ruleIds) => [ ...new Set(ruleIds) ]
  .sort((a, b) => a.localeCompare(b))
  .join(', ')

const toTestCases = (source) => [ ...source.matchAll(/\/\/ start (.+)\n([\s\S]+?)\n\/\/ end/g) ]
  .map(([ , ruleIds, text ]) => ({
    ruleIds: normalizeRuleIds(ruleIds.split(',').map((v) => v.trim())),
    text: `${ text }\n`,
  }))

const lintTestCases = (eslint, file, testCases) => Promise.all(
  testCases.map((testCase) => eslint
    .lintText(testCase.text, { filePath: file })
    .then(([ result ]) => ({ ...testCase, result }))),
)

const lintInvalidFile = async (t, config, file) => {
  const eslint = new ESLint({ overrideConfig: config, useEslintrc: false })

  const testCases = await readFile(file, 'utf-8')
    .then(toTestCases)
    .then((testCases) => lintTestCases(eslint, file, testCases))

  for (const { ruleIds, text, result: { messages } } of testCases) {
    const actual = normalizeRuleIds(messages.map((v) => v.ruleId))

    if (actual !== ruleIds) {
      console.log(text)
      console.log(messages)
    }

    t.equal(actual, ruleIds, ruleIds)
  }
}

const lintValidFile = async (t, config, file) => {
  const eslint = new ESLint({ overrideConfig: config, useEslintrc: false })

  const [
    { errorCount, warningCount, messages },
  ] = await eslint.lintFiles(file)

  if (errorCount + warningCount) {
    console.log(messages)
  }

  t.equal(errorCount, 0, 'no errors')
  t.equal(warningCount, 0, 'no warnings')
}

module.exports = {
  lintInvalidFile,
  lintValidFile,
}
