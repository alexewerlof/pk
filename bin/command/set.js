'use strict';

const assert = require('assert');
const crud = require('../../lib/crud');
const format = require('../../lib/format');

// TODO add type options
// TODO support setting array values JSON.stringify([undefined,null,3]) = "[null,null,3]"
const command = 'set <key> <value>';
const alias = [ 'write', 'update' ];
const description = 'Create the key if it doesn\'t exist and update its value.';

function builder(yargs) {
    yargs.positional('key', {
        default: undefined,
        defaultDescription: 'by default it operates on the root',
        describe: 'The path to a particular property in the json file',
        type: 'string',
    }).positional('value', {
        describe: 'The value'
    }).options({
        object: {
            nargs: 1,
            requiresArg: true,
            alias: 'json',
            desc: 'indicates an object value',
            type: 'string',
            coerce: JSON.parse,
            conflicts: ['array', 'string', 'number', 'boolean', 'null'],
        },
        array: {
            nargs: 1,
            requiresArg: true,
            desc: 'indicates an array value',
            type: 'string',
            coerce: JSON.parse,
            conflicts: ['object', 'string', 'number', 'boolean', 'null'],
        },
        string: {
            nargs: 1,
            requiresArg: true,
            desc: 'indicates a string value',
            type: 'string',
            conflicts: ['object', 'array', 'number', 'boolean', 'null'],
        },
        number: {
            nargs: 1,
            requiresArg: true,
            desc: 'indicates a numerical value',
            type: 'number',
            conflicts: ['object', 'array', 'string', 'boolean', 'null'],
        },
        null: {
            nargs: 0,
            requiresArg: false,
            desc: 'indicates a boolean value',
            conflicts: ['object', 'array', 'string', 'number', 'boolean'],
        }
    });
}

async function handler(argv) {
    const { key, value } = argv;
    assert.equal(typeof key, 'string');
    format.asyncHandler(argv, pkgJson =>  crud.setValue(pkgJson, key, value));
}

module.exports = { command, alias, description, builder, handler };
