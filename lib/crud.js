'use strict';

const utils = require('./utils');

/*
 * This module contains basic CRUD operation on objects/arrays.
 * Each function has two words. The first one explains the operation and the second
 * one explains if it operates on keys or values.
 */


function arrPushValue(pkgObj, path, value) {
    const target = utils._get(pkgObj, path);
    if (Array.isArray(target)) {
        const pkgObjClone = utils._cloneDeep(pkgObj);
        const targetArr = utils._get(pkgObj, path);
        targetArr.push(value);
        return pkgObjClone;
    }
}

function getValue(pkgObj, path) {
    if (path === undefined) {
        return pkgObj;
    }
    return utils._get(pkgObj, path);
}

function deleteKey(pkgObj, path) {
    if (hasKey(pkgObj, path)) {
        const pkgObjClone = utils._cloneDeep(pkgObj);
        // TODO this does not support paths yet
        delete pkgObjClone[path];
        return pkgObjClone;
    }
    return pkgObj;
}

function setValue(pkgObj, path, value) {
    const pkgObjClone = utils._cloneDeep(pkgObj);
    return _set(pkgObjClone, path, value);
}

function appendValue(pkgObj, path, value) {
    const pkgObjClone = utils._cloneDeep(pkgObj);
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
    if(utils.hasKey(pkgObj, path)) {
        const value = getValue(pkgObj, path);
        const pkgObjWithoutKey = deleteKey(pkgObj, path);
        return setValue(pkgObjWithoutKey, newName, value);
    }
    throw `path ${path} does not exist`;
}

module.exports = { getValue, setValue, deleteKey, renameKey };
