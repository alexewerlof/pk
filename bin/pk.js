#!/usr/bin/env node

'use strict';

const fs = require('fs');
const { resolve } = require('path');
const minimist = require('minimist');
const _get = require('lodash.get')
const filter = require('../lib/filter');
const format = require('../lib/format');

const argv = minimist(process.argv.slice(2), {
    string: [ 'file' ],
    boolean: [
        'help',
        'json', 'unix', 'min',
        'keys', 'values', 'count', 'type'
    ],
    alias: {
        h: 'help',
        f: ['file', 'input', 'in', 'i'],
        k: ['keys', 'key'],
        v: ['values', 'value', 'val', 'vals'],
        c: ['count', 'length', 'size'],
        t: ['type', 'types'],
    },
    default: {
        file: './package.json',
        format: 'unix'
    }
});

if (argv.help) {
    console.log(fs.readFileSync(resolve(__dirname, '../COMMANDS.md')).toString());
    process.exit(0);
}

function checkConflics(incompatibleOptions, argv) {
    const allOptions = Object.keys(argv);
    for (let i = 0; i < incompatibleOptions.length; i++) {
        const opt = incompatibleOptions[i];
        if (argv[opt]) {
            for (let j = 0; j < incompatibleOptions.length; j++) {
                if ( i == j ) {
                    continue;
                }
                const otherOpt = incompatibleOptions[j];
                if (argv[otherOpt]) {
                    throw `Cannot use ${opt} with ${otherOpt}`;
                }
            }
        }
    }
}

if (argv._.length > 1) {
    throw `Only one key is expected but got ${argv._.length}: ${argv._.join(', ')}`;
}

checkConflics(['json', 'unix', 'min'], argv);
checkConflics(['keys', 'values', 'count', 'type'], argv);

let content;
try {
    content = fs.readFileSync(argv.file);
} catch (err) {
    throw `Could not read ${argv.file}: ${err}`;
}

let contentJson;
try {
    contentJson = JSON.parse(content.toString());
} catch (err) {
    throw `Could not parse the contents as JSON: ${err}`;
}

const obj = argv._[0] ? _get(contentJson, argv._[0]) : contentJson;
if (obj === undefined) {
    throw `No data`;
}

let what;
if (argv.keys) {
    what = filter.keys(obj);
} else if (argv.values) {
    what = filter.values(obj);
} else if (argv.count) {
    what = filter.count(obj);
} else if (argv.type) {
    what = filter.type(obj);
} else {
    what = obj;
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
