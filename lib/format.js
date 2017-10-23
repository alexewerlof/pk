function object(name, obj) {
    if (typeof obj !== 'object') {
        throw 'not an object';
    }
    throw 'to be implemented'
    return Object.keys(obj).reduce()
}

function arr(name, array) {
    throw 'to be implemented'
}

function stringToBoolean(value) {
    switch (value.toLowerCase()) {
        case '1':
        case 'yes':
        case 'y':
        case 'true':
        case 't':
            return true;
        case '0':
        case 'no':
        case 'n':
        case 'false':
        case 'f':
            return false;
        default:
            throw `Invalid boolean expression: ${value}`;
    }
}

function stringToNumber(value) {
    const ret = Number(value);
    if (Number.isFinite(ret)) {
        return ret;
    }
    throw `Invalid number: ${value}`;
}

function stringToObject(value) {
    try {
        return JSON.parse(value);
    } catch (jsonError) {
        throw `Failed to parse value as JSON: ${value}`;
    }
}

function convertType(value, type) {
    switch(type) {
    case 'boolean':
        return stringToBoolean(value);
    case 'number':
        return stringToNumber(value);
    case 'object':
    case 'array':
    case 'null':
    case 'json':
        return stringToObject(value);
    default:
        throw `Unsupported type: ${type}`;
    }
}
