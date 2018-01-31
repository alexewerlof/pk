const assert = require('assert');
const fs = require('fs');
const { join } = require('path');
const { promisify } = require('util');
const childProcess = require('child_process');
const { expect } = require('chai');

const readFile = promisify(fs.readFile);

function relPath(...parts) {
    return join(__dirname, ...parts);
}

function runCli(args) {
    return new Promise(resolve => {
        childProcess.execFile(relPath('../bin/cli.js'), args, { cwd: relPath('cases') }, (error, stdout, stderr) => {
            assert.ifError(error);
            resolve(stdout);
        });
    });
}

async function readTestCase(fileName) {
    const testCase = (await readFile(relPath('cases', fileName))).toString();
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
    fs.readdirSync(relPath('cases'))
        .filter(fileName => /\.txt$/i.test(fileName))
        .forEach((fileName) => {
        
            it(fileName, async () => {
                const { args, output } = await readTestCase(fileName);
            
                expect(await runCli(args)).to.equal(output);
            });

        });
});