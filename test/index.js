'use strict'

const test = require('tape')
const config = require('../index')
const typescriptConfig = require('../typescript')
const { lintInvalidFile, lintValidFile } = require('./helper')

test('validate config for javascript', (t) => {
  Promise.all([
    lintValidFile(t, config, `${ __dirname }/examples/valid.js`),
    lintInvalidFile(t, config, `${ __dirname }/examples/invalid.js`),
  ])
    .finally(() => t.end())
})

test('validate config for typescript', (t) => {
  Promise.all([
    lintValidFile(t, typescriptConfig, `${ __dirname }/examples/valid.ts`),
    lintInvalidFile(t, typescriptConfig, `${ __dirname }/examples/invalid.ts`),
  ])
    .finally(() => t.end())
})
