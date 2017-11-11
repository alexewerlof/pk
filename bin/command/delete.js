const crud = require('../../lib/crud');
const format = require('../../lib/format');

// TODO allow everything BUT
// TODO allow removing a list of keys at once
const command = 'delete <key>';
const alias = ['del', 'rm'];
const description = 'Delete the specified key along with its value from the json file';

function builder(yargs) {
    yargs.positional('key', {
        describe: 'The path to a particular property in the json file',
    });
}

async function handler({ file, key }) {
    format.output(crud.deleteKey(file, key));
}

module.exports = { command, alias, description, builder, handler };
