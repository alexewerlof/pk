function outputUnix(data) {

}

function outputJson(data) {
    switch(typeof data) {
    case 'number':
    case 'boolean':
        return String(data);
    case 'object': // also includes null and arrays
        return JSON.stringify(data);
    default:
        throw `Invalid data type (${typeof data}): ${data}`;
    }
}

function output(data, format = 'unix') {
    return format === 'json' ? outputJson(data) : outputUnix(data);
}