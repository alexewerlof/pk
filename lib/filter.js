'use strict';
/*
Every function here should handle:
string
number
boolean
undefined
null
object
array
*/

function count(rawObj) {
    if (typeof rawObj === 'object') {
        if (Array.isArray(rawObj)) {
            return rawObj.length;
        } else {
            return rawObj === null ? 0 : Object.keys(rawObj).length;
        }
    }
    // for number, string, boolean or undefined
    return rawObj === undefined ? 0 : 1;
}

function keys(rawObj) {
    if (typeof rawObj !== 'object') {
        throw new Error(`Cannot get keys for a value of type ${typeof rawObj}`);
    }
    return Object.keys(rawObj);
}

function values(rawObj) {
    if (rawObj === undefined ) {
        return [];
    }
    if (typeof rawObj !== 'object') {
        // for number, string, boolean, undefined
        return rawObj;
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
    // for number, string, boolean, object and undefined
    return typeof rawObj;
}

module.exports = { count, keys, values, type };
