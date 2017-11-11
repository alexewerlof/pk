const filters = require('../../lib/filters');
const crud = require('../../lib/crud');
const format = require('../../lib/format');

// TODO add an option to deal with version values to get for example their major, minor, patch, prerelease, erorr if the value isn't a valid semver
const command = 'get [key]';
const alias = ['*', 'ls', 'cat'];
const description = 'Return the value of a key in the json file';

function builder(yargs) {
    yargs.positional('key', {
        default: undefined,
        defaultDescription: 'by default it operates on the root',
        describe: 'The path to a particular property in the json file',
        type: 'string',
    }).options({
        count: {
            nargs: 0,
            requiresArg: false,
            alias: ['c', 'l', 'length', 'size'],
            desc: 'count the number of keys or items. For other types, if the key exists, return 1 otherwise 0',
        },
        type: {
            nargs: 0,
            requiresArg: false,
            alias: ['t'],
            desc: 'get the type of the value',
            conflicts: ['count', 'keys', 'values'],
        },
        keys: {
            nargs: 0,
            requiresArg: false,
            alias: ['k'],
            desc: 'just list the keys (for objects)',
            conflicts: ['count', 'type', 'values'],
        },
        values: {
            nargs: 0,
            requiresArg: false,
            alias: ['v', 'vals', 'value'],
            desc: 'just list the values',
            conflicts: ['count', 'type', 'keys'],
        }
    });
}

async function handler (argv) {
    const raw = crud.getValue(await argv.file.json(), argv.key);
    let result;
    
    if (argv.count) {
        // TODO add an option to just get the count for objects and arrays. It returns nothing (and an error code) otherwise
        result = filters.count(raw);
    } else if (argv.type) {
        result = filters.type(raw);
    } else if (argv.keys) {
        result = filters.keys(raw);
    } else if (argv.values) {
        result = filters.values(raw);
    } else {
        result = raw;
    }
    return format.output(argv, result);
}

module.exports = { command, alias, description, builder, handler };
