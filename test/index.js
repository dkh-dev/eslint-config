'use strict'

const { CLIEngine } = require('eslint')
const test = require('tape')

test('validate syntax', t => {
    const code = `'use strict'\n\nconst foo = 1\nconst bar = () => void 0\n\nbar(foo)\n`
    const cli = new CLIEngine({
        useEslintrc: false,
        configFile: 'index.js',
    })

    const { errorCount, warningCount } = cli.executeOnText(code)

    t.equal(errorCount + warningCount, 0)
    t.end()
})
