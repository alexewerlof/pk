'use strict';

const _has = require('lodash.has');
const _get = require('lodash.get');
const _set = require('lodash.set');
const _cloneDeep = require('lodash.clonedeep');

function isNonNullObject(value) {
    return typeof value === 'object' && value !== null;
}

function hasKey(pkgObj, path) {
    return _has(pkgObj, path);
}

const pathExists = hasKey;

function type(obj, path) {
    const value = _get(obj, path);
    if (value === undefined ) {
        return 'undefined';
    } else if (value === null) {
        return 'null';
    } else if (Array.isArray(value)) {
        return 'array';
    } else {
        // 'object', 'string', 'number', 'boolean'
        return typeof value;
    }
}

function set(obj, path, value) {
    const objClone = _cloneDeep(obj);
    return _set(objClone, path, value);
}

function get(obj, path) {
    return _get(obj, path, value);
}

module.exports = { _has, _get, _set, _cloneDeep, isNonNullObject, hasKey, pathExists, type };
