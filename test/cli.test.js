const assert = require('assert');
const fs = require('fs');
const { join, extname } = require('path');
const { promisify } = require('util');
const { exec } = require('child_process');
const { expect } = require('chai');

const readFile = promisify(fs.readFile);

function relPath(...parts) {
    return join(__dirname, ...parts);
}

function runCli(args) {
    return new Promise(resolve => {
        exec(`${relPath('../bin/pk.js')} ${args}`, {
            cwd: relPath('cases'),
            timeout: 2000, //msec
        }, (error, stdout, stderr) => {
            assert.ifError(error);
            assert.ifError(stderr);
            resolve(stdout);
        });
    });
}

async function readTestCase(fileName) {
    const testCase = (await readFile(relPath('cases', fileName))).toString();
    const testCaseLines = testCase.split('\n');
    assert.ok(testCaseLines.length >= 3, `test case should contain description, params and expected output ${testCase}`);
    const [ desc, args, ...output ] = testCaseLines;
    return {
        desc,
        args,
        expectedOutput: output.join('\n')
    };
}

describe('cli', () => {
    fs.readdirSync(relPath('cases'))
        .filter(fileName => extname(fileName) === '.txt')
        .forEach((fileName) => {

            it(fileName, async () => {
                const { args, expectedOutput } = await readTestCase(fileName);
                const output = await runCli(args)
                expect(output).to.equal(expectedOutput);
            });

        });
});
