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

module.exports = { _has, _get, _set, _cloneDeep, isNonNullObject, hasKey };