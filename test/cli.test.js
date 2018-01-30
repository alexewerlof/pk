const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const childProcess = require('child_process');
const { expect } = require('chai');

const readFile = promisify(fs.readFile);

const tests = [
    {
        desc: 'gets name',
        args: ['get', 'name', '-i', './io/get1.json'],
        i: './test/io/get1.json',
        o: './test/io/get1.txt'
    }
];

function runCli(args) {
    return new Promise(resolve => {
        childProcess.execFile(path.join(__dirname, '../bin/cli.js'), args, { cwd: __dirname }, (error, stdout, stderr) => {
            assert.ifError(error);
            resolve(stdout);
        });
    });
}

describe('cli', () => {
    tests.forEach(({ desc, args, i, o }) => {
        
        it(desc, async () => {
            const expectedOutput = (await readFile(o)).toString();
            expect(await runCli(args)).to.equal(expectedOutput);
        });

    });
});