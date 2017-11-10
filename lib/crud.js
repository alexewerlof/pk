'use strict';

/*
 * This module contains basic CRUD operation on objects/arrays.
 * Each function has two words. The first one explains the operation and the second
 * one explains if it operates on keys or values.
 */

const _get = require('lodash.get');
const _set = require('lodash.set');
const _has = require('lodash.has');
const _cloneDeep = require('lodash.clonedeep');

function isNonNullObject(value) {
    return typeof value === 'object' && value !== null;
}

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

function getValue(pkgObj, path) {
    if (path === undefined) {
        return pkgObj;
    }
    return _get(pkgObj, path);
}

function countValue(pkgObj, path) {
    const value = getValue(pkgObj, path);
    if (isNonNullObject(value)) {
        if (Array.isArray(value)) {
            return value.length;
        } else {
            return Object.keys(value).length;
        }
    }
    return hasKey(pkgObj, path) ? 1 : 0;
}

function deleteKey(pkgObj, path) {
    if (hasKey(pkgObj, path)) {
        const pkgObjClone = _cloneDeep(pkgObj);
        // TODO this does not support paths yet
        delete pkgObjClone[path];
        return pkgObjClone;
    }
    return pkgObj;
}

function setValue(pkgObj, path, value) {
    const pkgObjClone = _cloneDeep(pkgObj);
    return _set(pkgObjClone, path, value);
}

function appendValue(pkgObj, path, value) {
    const pkgObjClone = _cloneDeep(pkgObj);
    if (getValueType(pkgObj, key) !== 'array') {
        throw 'Not an array';
    }
    const arr = getValue(pkgObj, path);
    arr.append(value);
    return pkgObjClone;
}

function getValueType(pkgObj, path) {
    const value = getValue(pkgObj, path);
    const typeofValue = typeof value;
    if (typeofValue === 'object') {
        if (value === null) {
            return 'null';
        }
        if (Array.isArray(value)) {
            return 'array';
        }
        return 'object';
    }
    // TODO return nothing if it is undefined and set exit code to non-zero
    // for 'undefined', 'number', 'string' and 'boolean'
    return typeofValue;
}

function getKeys(pkgObj, path) {
    const value = getValue(pkgObj, path);
    if (isNonNullObject(value)) {
        return Object.keys(value);
    }
    if (value === null) {
        return '';
    }
    throw `${path} does not point to an object`;
}

function getValues(pkgObj, path) {
    const value = getValue(pkgObj, path);
    if (isNonNullObject(value)) {
        return Array.isArray(value) ? value : Object.values(value);
    }
    throw `${path} does not point to an object or array`;
}

function diffObj(object, base) {
	function changes(object, base) {
		return _.transform(object, function(result, value, key) {
			if (!_.isEqual(value, base[key])) {
				result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
			}
		});
	}
	return changes(object, base);
}

function renameKey(pkgObj, path, newName) {
    if(_has(pkgObj, path)) {
        const value = getValue(pkgObj, path);
        const pkgObjWithoutKey = deleteKey(pkgObj, path);
        return setValue(pkgObjWithoutKey, newName, value);
    }
    throw `path ${path} does not exist`;
}

module.exports = { getValue, countValue, getValueType, getKeys, getValues, setValue, deleteKey, renameKey };
