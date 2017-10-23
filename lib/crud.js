'use strict';

/*
 * This module contains basic CRUD operation on objects/arrays.
 * Each function has two words. The first one explains the operation and the second
 * one explains if it operates on keys or values.
 */

const _get = require('lodash.get');
const _set = require('lodash.set');
const _has = require('lodash.has');
const _cloneDeep = require('lodash.cloneDeep');

function hasKey(pkgObj, path) {
    return _has(pkgObj, path);
}

function arrLen(pkgObj, path) {
    const target = _get(pkgObj, path);
    if (Array.isArray(target)) {
        return target.length;
    }
    throw `${path} is not an array`;
}

function arrPushValue(pkgObj, path, value) {
    const target = _get(pkgObj, path);
    if (Array.isArray(target)) {
        const pkgObjClone = _cloneDeep(pkgObj);
        const targetArr = _get(pkgObj, path);
        targetArr.push(value);
        return pkgObjClone;
    }
}

function objLen(pkgObj, path) {
    const target = _get(pkgObj, path);
    if (typeof target === 'object') {
        if (target === null) {
            return 0;
        }
        return Object.keys(target).length;
    }
    throw `${path} is not an object`;
}

function countValues(pkgObj, path) {
    if (hasKey(pkgObj, path)) {
        const target = getValue(pkgObj, path);
        return Array.isArray(target) ? arrLen(pkgObj, path) : objLen(pkgObj, path);
    }
}

function getValue(pkgObj, path) {
    return _get(pkgObj, path);
}

function deleteKey(pkgObj, path) {
    if (hasKey(pkgObj, path)) {
        const pkgObjClone = _cloneDeep(pkgObj);
        throw 'implement me';
    }
    return pkgObj;
}

function setValue(pkgObj, path, value) {
    const pkgObjClone = _cloneDeep(pkgObj);
    return _set(pkgObjClone, path, value);
}

function updateValue(pkgObj, path, value) {
    if(_has(pkgObj, path)) {
        return set(pkgObj, path, value);
    }
    throw `path ${path} does not exist`;
}

function renameKey(pkgObj, path, newName) {
    if(_has(pkgObj, path)) {
        const value = getValue(pkgObj, path);
        const pkgObjWithoutKey = deleteKey(pkgObj, path);
        return setValue(pkgObjWithoutKey, newName, value);
    }
    throw `path ${path} does not exist`;
}

module.exports = { hasKey, arrLen, get };
