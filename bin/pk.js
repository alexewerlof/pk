#!/usr/bin/env node

'use strict';

const fs = require('fs');
const yargs = require('yargs');
const _get = require('lodash.get')
const debug = require('debug');
const filter = require('../lib/filter');
const format = require('../lib/format');

const log = debug('pk');

const argv = yargs
    .usage('Usage: pk [options] [path]\n' +
        'The path can be the name of a key like "name" or "keywords[3]" or "bugs.url".')
    .options({
        v: {
            describe: 'Get values',
            alias: 'val',
            type: 'boolean',
            conflicts: ['t', 'c'],
        },
        k: {
            describe: 'Get keys (default)',
            alias: 'key',
            type: 'boolean',
        },
        c: {
            describe: 'Count the number of values for an array or number of keys for objects',
            alias: 'count',
            type: 'boolean',
        },
        t: {
            describe: 'Show types instead of values',
            alias: 'type',
            type: 'boolean',
            conflicts: ['c', 'v']
        },
        j: {
            describe: 'Output JSON',
            alias: 'json',
            type: 'boolean',
        },
        m: {
            describe: 'Output minified JSON',
            alias: 'min',
            type: 'boolean',
        },
        i: {
            describe: 'The input JSON file',
            alias: 'in',
            type: 'string',
            default: './package.json',
            normalize: true,
        }
    })
    .alias('h', 'help')
    .example('pk name', 'prints the value of "name" key from the current "package.json" file')
    .version()
    .epilog('Made in Sweden')
    .help()
    .wrap(null)
    .argv

log(argv)

function readJSON(fileName) {
    log('Reading file from path', fileName)
    return JSON.parse(fs.readFileSync(fileName, 'utf8'))
}

let what;
try {
    const path = argv._[0];
    let result = path ? _get(readJSON(argv.in), path) : readJSON(argv.in);
    if (argv.key && argv.val) {
        what = result
    } else if (argv.val) {
        what = filter.values(result);
    } else if (argv.count) {
        what = filter.count(result);
    } else if (argv.type) {
        what = filter.type(result);
    } else {
        what = filter.keys(result);
    }
} catch (err) {
    console.log(err);
    process.exit(1);
}

let how;
if (argv.json) {
    how = 'json';
} else if (argv.min) {
    how = 'min';
} else {
    how = 'unix';
}

console.log(format.output(what, how));
