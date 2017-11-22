'use strict';

const assert = require('assert');
const crud = require('../../lib/crud');
const format = require('../../lib/format');
const utils = require('../../lib/utils');
// TODO add type options
// TODO add an option to specify position: start, end (for explicit index use set)
const command = 'append <key> <value..>';
const alias = 'add';
const description = 'Append a value to a key that has an array value';

function builder(yargs) {
    yargs.positional('value', {
        describe: 'The value to be added to the array',
    });
}

function handler(argv) {
    const { key, value } = argv;
    assert.equal(typeof key, 'string');
    format.asyncHandler(argv, pkgJson => crud.appendValue(pkgJson, key, value));
}

module.exports = { command, alias, description, builder, handler };
