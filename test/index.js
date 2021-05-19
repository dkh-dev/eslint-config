'use strict'

const { ESLint } = require('eslint')
const test = require('tape')

test('validate eslint config', async t => {
  const eslint = new ESLint()
  const [ { errorCount, warningCount } ] = await eslint.lintFiles(__filename)

  t.equal(errorCount + warningCount, 0)
  t.end()
})
