'use strict';

const jsYaml = require('js-yaml');

function yaml(data, indent = 2) {
    return jsYaml.safeDump(data, { indend });
}

function unix(data) {
    if (typeof data === 'object' && data !== null) {
        if (Array.isArray(data)) {
            return data.join('\n');
        }
        return Object.keys(data).map(k => `${k}\t${data[k]}`).join('\n');
    }
    return String(data);
}

function json(data, indent) {
    switch(typeof data) {
    case 'number':
    case 'boolean':
    case 'string':
        return String(data);
    case 'object': // also includes null and arrays
        return JSON.stringify(data, undefined, indent);
    default:
        throw `Invalid data type (${typeof data}): ${data}`;
    }
}

// TODO support 'unix' and 'yaml|yml' too
// TODO add an option for pretty formatting the JSON objects
// TODO the format should by default be unix so it can be easier to use it in bash scripts

async function output(data, file, format) {
    switch(format) {
        case 'json':
            return json(data, (await file.indent()).indent);
        case 'unix':
            return unix(data);
        case 'yaml':
            return yaml(data, (await file.indent()).amount);
        default:
            throw `Invalid format: ${format}`;
    }
}

async function asyncHandler(argv, handler) {
    try {
        const { file, format } = argv;
        const result = handler(await file.json());
        console.log(await output(result, file, format));
    } catch (error) {
        console.error(error);
    }
}

module.exports = { asyncHandler };