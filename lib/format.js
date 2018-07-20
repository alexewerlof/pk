'use strict';

function unix(data) {
    if (typeof data === 'object' && data !== null) {
        if (Array.isArray(data)) {
            return data.join('\n');
        }
        return Object.entries(data).map(([k, v]) => `${k}\t${json(v)}`).join('\n');
    }
    if (data === undefined) {
        return '';
    }
    return String(data);
}

function json(data, indent = 0) {
    switch(typeof data) {
    case 'number':
    case 'boolean':
    case 'string':
        return String(data);
    case 'object': // also includes null and arrays
        return JSON.stringify(data, undefined, indent);
    case 'undefined':
        return '{}';
    default:
        throw `Invalid data type (${typeof data}): ${data}`;
    }
}

// TODO support 'unix' and 'yaml|yml' too
// TODO add an option for pretty formatting the JSON objects
// TODO the format should by default be unix so it can be easier to use it in bash scripts

function output(data, format) {
    switch(format) {
        case 'json':
            return json(data, 2);
        case 'min':
            return json(data);
        case 'unix':
            return unix(data);
        default:
            throw `Invalid format: ${format}`;
    }
}

module.exports = { output };
