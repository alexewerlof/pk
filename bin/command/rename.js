'use strict';

const assert = require('assert');
const crud = require('../../lib/crud');
const format = require('../../lib/format');

// TODO error if newname still exists
const command = 'rename <key> <newname>';
const alias = ['ren', 'mv' ];
const description = 'Rename a key keeping its value';

function builder(yargs) {
    yargs.positional('key', {
        describe: 'The path to a particular property in the json file'
    });
    yargs.positional('newname', {
        describe: 'The new name for the key'
    });
}

function handler(argv) {
    assert.equal(typeof argv.key, 'string');
    assert.equal(typeof argv.newname, 'string');
    format.asyncHandler(argv, pkgJson =>  crud.renameKey(pkgJson, argv.key, argv.newname));
}

module.exports = { command, alias, description, builder, handler };
