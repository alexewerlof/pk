const { render } = require('micromustache');

const errors = {
    0: 'success',
    1: 'could not read the {{path}} file: {{err}}',
    2: 'could not parse json: {{jsonParseError}}',
    3: 'the requested key does not exist: {{key}}',
    4: 'no key is provided',
    5: 'could not read the help file: {{err}}',
    100: 'invalid error code {{code}}'
};

function exit(code, params = {}, shouldLog = true) {
    if (errors[code] === undefined) {
        code = -1;
    }
    const description = render(errors[code], params);
    if (!shouldLog && code) {
        console.log(`Error ${code}: ${description}`);
    }
    process.exit(code);
}

module.exports = { exit };
