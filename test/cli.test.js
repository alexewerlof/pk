const fs = require('fs');
const { promisify } = require('util');
const childProcess = require('child_process');

const readFile = promisify(fs.readFile);

const tests = [
    {
        desc: 'gets name',
        args: ['get', 'name', '-i', 'io/get1.json'],
        i: 'get1.json',
        o: 'get1.txt'
    }
];

function runCli(args) {
    return new Promise(resolve => {
        childProcess.execFile('../bin/cli.js', args, { cwd: './io/' }, (error, stdout, stderr) => {
            assert.ifError(error);
            resolve(stdout);
        });
    });
}

describe('cli', () => {
    tests.forEach(({ desc, args, i, o }) => {
        
        it(desc, async () => {
            expect(await runCli(args)).to.equal(await readFile(o));
        });

    });
});