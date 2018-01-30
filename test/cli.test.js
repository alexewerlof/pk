const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const childProcess = require('child_process');
const { expect } = require('chai');

const readFile = promisify(fs.readFile);

const tests = [
    './test/io/get1.txt'
];

function runCli(args) {
    return new Promise(resolve => {
        childProcess.execFile(path.join(__dirname, '../bin/cli.js'), args, { cwd: path.join(__dirname, 'io') }, (error, stdout, stderr) => {
            assert.ifError(error);
            resolve(stdout);
        });
    });
}

describe('cli', () => {
    tests.forEach((o) => {
        
        it(o, async () => {
            const testCase = (await readFile(o)).toString();
            const testCaseLines = testCase.split('\n');
            assert.ok(testCaseLines.length > 3, `test case should contain description, params and expected output ${testCase}`);
            const [ desc, args, ...expectedOutput ] = testCaseLines;
        
            expect(await runCli(args.split(' '))).to.equal(expectedOutput.join('\n'));
        });

    });
});