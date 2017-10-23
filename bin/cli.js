#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const { render } = require('micromustache');
const minimist = require('minimist')
const pkgJson = require('../package.json');
const { exit } = require('./static-error-code');

const options = minimist(process.argv.slice(2), {
    // @see https://www.npmjs.com/package/minimist#var-argv--parseargsargs-opts
    string: ['in'],
    boolean: ['help', 'silent', 'version'],
    alias: {
        in: 'i',
        help: 'h',
        silent: 'q',
        version: 'v'
    },
    default: {
        in: './package.json'
    }
});

function showHelp() {
    fs.readFile(path.join(__dirname, 'help.mustache'), (err, helpText) => {
        if (err) {
            exit(5, {err});
        }
        console.log(render(helpText.toString(), pkgJson));
        exit(0);
    });
}

function showVersion() {
    console.log(pkgJson.version);
    exit(0);
}

function showKey(key) {
    fs.readFile(options.in, (err, content) => {
        if (err) {
            exit(1, { err });
        } else {
            const contentStr = content.toString();
            try {
                const contentObj = JSON.parse(contentStr);
                const val = contentObj[key];
                if (val === undefined) {
                    exit(3, { key });
                } else {
                    console.log(val);
                }
            } catch (jsonParseError) {
                exit(2, { jsonParseError });
            }
        }
    });
}

if (options.help) {
    showHelp();
} else if (options.version) {
    showVersion();
} else {
    const key = options._[0];
    if (key === undefined) {
        exit(4);
    } else {
        showKey(key);
    }
}
