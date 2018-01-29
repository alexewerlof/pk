#!/usr/bin/env node

'use strict';

const yargs = require('yargs');
const crud = require('../lib/crud');
const format = require('../lib/format');
const File = require('../lib/File');

const argv = yargs
    .commandDir('./command')
    .options({
        file: {
            nargs: 1,
            requiresArg: true,
            alias: 'i',
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
            alias: 'f',
            desc: 'speficies the output format',
            global: true,
            type: 'string',
            default: 'unix',
            defaultDescription: 'unix compatible format suitable for scripting',
            choices: ['unix', 'json', 'json-min', 'yaml'],
        },
        
    })
    .epilogue(`wherever key is mentioned, you can pass a path like a.b.c or a['b'].c as well as array indexes like a[2].c`)
    .help('help')
    .alias('h', 'help')
    //.wrap()
    // .showCompletionScript()
    .recommendCommands()
    .exitProcess(false) //TODO disable later
    .argv;

//console.log('-----------');
//console.dir(argv);