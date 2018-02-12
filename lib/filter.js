'use strict';

function count(rawObj) {
    if (typeof rawObj === 'object') {
        if (Array.isArray(rawObj)) {
            return rawObj.length;
        } else {
            return rawObj === null ? 0 : Object.keys(rawObj).length;
        }
    }
    // now it can be string, number and boolean
    return rawObj === undefined ? 0 : 1;
}

function keys(rawObj) {
    if (typeof rawObj !== 'object') {
        throw `Not an object or array`;
    }
    // Works even for arrays even though the result is less useful than --count
    return rawObj === null ? [] : Object.keys(rawObj);
}

function values(rawObj) {
    if (typeof rawObj !== 'object') {
        throw `Not an object or array`;
    }
    if (Array.isArray(rawObj)) {
        return rawObj;
    }
    return rawObj === null ? [] : Object.values(rawObj);
}

function type(rawObj) {
    if (Array.isArray(rawObj)) {
        return 'array';
    } else if (rawObj === null) {
        return 'null';
    }
    return typeof rawObj;
}

module.exports = { count, keys, values, type };
