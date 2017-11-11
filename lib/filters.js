const utils = require('./utils');

function count(rawObj) {
    if (utils.isNonNullObject(rawObj)) {
        if (Array.isArray(rawObj)) {
            return rawObj.length;
        } else {
            return Object.keys(rawObj).length;
        }
    }
    return rawObj === undefined ? 0 : 1;
}

function keys(rawObj) {
    if (typeof rawObj !== 'object') {
        throw `Not an object or array`;
    }
    // Works even for arrays even though the result is less useful than --count
    return rawObj === null ? [] : Object.keys(rawObj);
}

function values(rawObj, path) {
    if (typeof rawObj !== 'object') {
        throw `Not an object or array`;
    }
    if (Array.isArray(rawObj)) {
        return rawObj;
    }
    return rawObj === null ? [] : Object.values(rawObj);
}

module.exports = { count, keys, values };