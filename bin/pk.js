#!/usr/bin/env node

'use strict';

const fs = require('fs');
const yargs = require('yargs');
const _get = require('lodash.get')
const debug = require('debug');
const didyoumean = require('didyoumean');
const filter = require('../lib/filter');
const format = require('../lib/format');
const completion = require('../lib/completion');

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
        s: {
            describe: 'Parse the value as a semver version',
            alias: 'semver',
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
    .help()
    .epilogue('Bugs and feature requests: https://github.com/userpixel/pk/issues')
    .completion('bashcomp', function (current, argv) {
        try {
            log('current:', current, 'argv:', argv)
            return completion.pathCompletion(readJSON(argv.i), current)
        } catch(e) {
            log(e)
            return [];
        }
    })
    .wrap(null)
    .argv

log(argv)

function readJSON(fileName) {
    log('Reading file', fileName)
    return JSON.parse(fs.readFileSync(fileName, 'utf8'))
}

let what;
try {
    const path = argv._[0];
    log(path ? `Path is ${path}` : 'There is no path. Operating on the whole file.');
    const jsonContents = readJSON(argv.in);
    let result = jsonContents;
    if (path) {
        result = _get(jsonContents, path)
        if (result === undefined) {
            log(`Could not lookup the path "${path}"`)
            didyoumean.threshold = 0.5
            const possiblePaths = didyoumean(path, completion.getKeys(jsonContents))
            if (possiblePaths) {
                throw new Error(`There is no "${path}". Did you mean:\n${possiblePaths}`)
            }
            throw new Error(`Path not found: ${path}`)
        }
    }
    if (argv.key && argv.val) {
        log('Both keys are values are desired');
        what = result
    } else if (argv.key) {
        log('Only keys are requested');
        what = filter.keys(result);
    } else if (argv.val) {
        log('Only values are requested');
        what = filter.values(result);
    } else if (argv.count) {
        log('Only count is requested');
        what = filter.count(result);
    } else if (argv.type) {
        log('Only type is requested');
        what = filter.type(result);
    } else if (argv.semver) {
        log('Parsing as semver');
        what = filter.semver(result);
    } else {
        log('No filters specified, operating on the whole JSON');
        what = result;
    }
} catch (err) {
    log(err)
    console.log(err.message || err);
    process.exit(1);
}

let how;
if (argv.min) {
    how = 'min';
} else if (argv.json) {
    how = 'json';
} else {
    how = 'unix';
}

console.log(format.output(what, how));
