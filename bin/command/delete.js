'use strict';

const assert = require('assert');
const crud = require('../../lib/crud');
const format = require('../../lib/format');

// TODO allow everything BUT
// TODO allow removing a list of keys at once
const command = 'delete <keys..>';
const aliases = ['del', 'rm'];
const description = 'Delete one or more keys along with their values from the json file';

// TODO add an option to reverse the detele and essentially "pick" elements...
// TODO or maybe it makes sense to add this functionality to the "get" command maybe?
function builder(yargs) {
    yargs.positional('keys', {
        describe: 'The paths to properties in the json file that are going to be removed.',
    });
}

function handler(argv) {
    assert.ok(Array.isArray(argv.keys), 'keys must be an array');
    format.asyncHandler(argv, pkgJson =>  crud.deleteKey(pkgJson, ...argv.keys));
}

module.exports = { command, aliases, description, builder, handler };
