const assert = require('assert');
const fs = require('fs');
const { join } = require('path');
const { promisify } = require('util');
const childProcess = require('child_process');
const { expect } = require('chai');

const readFile = promisify(fs.readFile);

function runCli(args) {
    return new Promise(resolve => {
        childProcess.execFile(join(__dirname, '../bin/cli.js'), args, { cwd: join(__dirname, 'io') }, (error, stdout, stderr) => {
            assert.ifError(error);
            resolve(stdout);
        });
    });
}

async function readTestCase(fileName) {
    const testCase = (await readFile(join(__dirname, 'io', fileName))).toString();
    const testCaseLines = testCase.split('\n');
    assert.ok(testCaseLines.length > 3, `test case should contain description, params and expected output ${testCase}`);
    const [ desc, args, ...output ] = testCaseLines;
    return {
        desc,
        args: args.split(' '), //Bogus for when we use quotations
        output: output.join('\n')
    };
}

describe('cli', () => {
    fs.readdirSync(join(__dirname, 'io'))
        .filter(fileName => /\.txt$/i.test(fileName))
        .forEach((fileName) => {
        
            it(fileName, async () => {
                const { args, output } = await readTestCase(fileName);
            
                expect(await runCli(args)).to.equal(output);
            });

        });
});