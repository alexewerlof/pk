#!/usr/bin/env node

const yargs = require('yargs');
const crud = require('../lib/crud');
const format = require('../lib/format');
const File = require('../lib/File');

async function stringify(argv, data) {
    switch(argv.format) {
        case 'json':
            return format.json(data, await argv.file.indent().indent);
        case 'unix':
            return format.unix(data);
        case 'yaml':
            return format.yaml(data,  await argv.file.indent().amount);
        default:
            throw `Invalid format: ${format}`;
    }
}

function print(string) {
    console.log(string);
}

async function output(argv, data) {
    print(await stringify(argv, data));
}

const argv = yargs
    // TODO use commandDir https://github.com/yargs/yargs/blob/968ee06d393ee643d0afb5f5c7e82f0759b3c747/docs/advanced.md#commanddirdirectory-opts
    .command({
        // TODO add an option to deal with version values to get for example their major, minor, patch, prerelease, erorr if the value isn't a valid semver
        command: 'get [key]',
        alias: ['*', 'ls', 'cat'],
        desc: 'Return the value of a key or array index in the json file',
        builder: (yargs) => {
            yargs.options({
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
                    conflicts: ['count', 'keys', 'values']
                },
                keys: {
                    nargs: 0,
                    requiresArg: false,
                    alias: ['k'],
                    desc: 'just list the keys (for objects)',
                    conflicts: ['count', 'type', 'values']
                },
                values: {
                    nargs: 0,
                    requiresArg: false,
                    alias: ['v', 'vals', 'value'],
                    desc: 'just list the values',
                    conflicts: ['count', 'type', 'keys']
                }
            }).positional('key', {
                default: undefined,
                defaultDescription: 'by default it operates on the root',
                describe: 'The path to a particular property in the json file'
            });
        },
        handler: async (argv) => {
            if (argv.count) {
                // TODO add an option to just get the count for objects and arrays. It returns nothing (and an error code) otherwise
                return output(argv, crud.countValue(await argv.file.json(), argv.key));
            }
            if (argv.type) {
                return output(argv, crud.getValueType(await argv.file.json(), argv.key));
            }
            if (argv.keys) {
                return output(argv, crud.getKeys(await argv.file.json(), argv.key));
            }
            if (argv.values) {
                return output(argv, crud.getValues(await argv.file.json(), argv.key));
            }
            return output(argv, crud.getValue(await argv.file.json(), argv.key));
        },
    })
    .command({
        // TODO allow everything BUT
        // TODO allow removing a list of keys at once
        command: 'delete <key>',
        alias: ['del', 'rm'],
        desc: 'Delete the specified key along with its value from the json file',
        builder: (yargs) => {
            yargs.positional('key', {
                describe: 'The path to a particular property in the json file'
            });
        },
        handler: ({ file, key }) => output(crud.deleteKey(file, key)),
    })
    .command({
        // TODO add type options
        // TODO support setting array values JSON.stringify([undefined,null,3]) = "[null,null,3]"
        command: 'set <key> <value>',
        desc: 'Create the key if it doesn\'t exist and update its value.',
        builder: (yargs) => yargs.default('value', 'true'),
        handler: ({ file, key, value }) => output(crud.setValue(file, key, value))
    })
    .command({
        // TODO add type options
        // TODO add an option to specify position: start, end (for explicit index use set)
        command: 'append <value>',
        alias: 'add',
        desc: 'Append a value to a key with an array value',
        builder: (yargs) => {
            yargs.positional('value', {
                describe: 'The value to be added to the array'
            })
        },
        handler: ({ file, key, value }) => output(crud.appendValue(file, key, value))
    })
    .command({
        // TODO error if newname still exists
        command: 'rename <key> <newname>',
        alias: ['ren', 'mv' ],
        desc: 'Rename a key keeping its value',
        builder: (yargs) => {
            yargs.positional('key', {
                describe: 'The path to a particular property in the json file'
            });
            yargs.positional('newname', {
                describe: 'The new name for the key'
            });
        },
        handler: ({ file, key, newname }) => output(crud.renameKey(file, key, newname)),
    })
    .command({
        // TODO add an option to specify how deep the diff should go
        // TODO add an option to diff part of an objects
        // TODO make sure we can handle stdin
        command: 'diff <file1> <file2>',
        desc: 'Finds the differences between two JSON files or parts of them.',
    })
    .options({
        file: {
            nargs: 1,
            requiresArg: true,
            alias: 'f',
            desc: 'path to the json file',
            normalize: true,
            global: true,
            type: 'string',
            coerce: fileName => new File(fileName),
            default: './package.json',
            defaultDescription: 'The package.json file in the current directory',
        },
        format: {
            nargs: 1,
            requiresArg: true,
            alias: 'm',
            desc: 'speficies the out format',
            global: true,
            type: 'string',
            default: 'unix',
            defaultDescription: 'unix compatible format suitable for scripting',
            choices: ['unix', 'json', 'json-min', 'yaml'],
        },
        object: {
            nargs: 1,
            requiresArg: true,
            alias: 'json',
            desc: 'indicates an object value',
            global: true,
            type: 'string',
            coerce: JSON.parse,
            conflicts: ['array', 'string', 'number', 'boolean', 'null'],
        },
        array: {
            nargs: 1,
            requiresArg: true,
            desc: 'indicates an array value',
            global: true,
            type: 'string',
            coerce: JSON.parse,
            conflicts: ['object', 'string', 'number', 'boolean', 'null'],
        },
        string: {
            nargs: 1,
            requiresArg: true,
            desc: 'indicates a string value',
            global: true,
            type: 'string',
            conflicts: ['object', 'array', 'number', 'boolean', 'null'],
        },
        number: {
            nargs: 1,
            requiresArg: true,
            desc: 'indicates a numerical value',
            global: true,
            type: 'number',
            conflicts: ['object', 'array', 'string', 'boolean', 'null'],
        },
        null: {
            nargs: 0,
            requiresArg: false,
            desc: 'indicates a boolean value',
            global: true,
            conflicts: ['object', 'array', 'string', 'number', 'boolean'],
        }
    })
    .group(['object', 'array', 'string', 'number', 'null'], 'Types:')
    .conflicts('set', ['get', 'delete'])
    .help('help')
    .alias('h', 'help')
    //.wrap()
    // .showCompletionScript()
    .recommendCommands()
    .exitProcess(false) //TODO disable later
    .argv;

//console.log('-----------');
//console.dir(argv);