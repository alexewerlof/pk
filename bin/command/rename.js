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

async function handler({ file, key, newname }) {
    format.output(crud.renameKey(file, key, newname));
}

module.exports = { command, alias, description, builder, handler };
