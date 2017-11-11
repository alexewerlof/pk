const crud = require('../../lib/crud');
const format = require('../../lib/format');

// TODO add type options
// TODO add an option to specify position: start, end (for explicit index use set)
const command = 'append <key> <value>';
const alias = 'add';
const description = 'Append a value to a key with an array value';

function builder(yargs) {
    yargs.positional('value', {
        describe: 'The value to be added to the array',
    });
}

async function handler({ file, key, value }) {
    format.output(crud.appendValue(file, key, value));
}

module.exports = { command, alias, description, builder, handler };
