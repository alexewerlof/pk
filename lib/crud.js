#!/usr/bin/env node

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

function deleteKey(pkgObj, ...paths) {
    const pkgObjClone = utils._cloneDeep(pkgObj);
    paths.forEach(path => {
        if (utils.hasKey(pkgObjClone, path)) {
            delete pkgObjClone[path];
        }
    });
    return pkgObjClone;
}

function setValue(pkgObj, path, value) {
    const pkgObjClone = utils._cloneDeep(pkgObj);
    return utils._set(pkgObjClone, path, value);
}

function appendValue(pkgObj, path, value) {
    const pkgObjClone = utils._cloneDeep(pkgObj);
    let dest = utils._get(pkgObj, path);
    if (dest === undefined) {
        dest = [];
        utils._set(pkgObj, path, dest);
    } else if (!Array.isArray(dest)) {
        throw 'Not an array';
    }
    dest.concat(value);
    return pkgObjClone;
}

/* TODO ship the diff command in the future
function diffObj(obj1, obj2) {
	function changes(object, base) {
		return _.transform(object, function(result, value, key) {
			if (!_.isEqual(value, base[key])) {
				result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value;
			}
		});
	}
	return changes(obj1, obj2);
}
*/

function renameKey(pkgObj, path, newName) {
    if (utils.hasKey(pkgObj, path)) {
        const value = getValue(pkgObj, path);
        const pkgObjWithoutKey = deleteKey(pkgObj, path);
        return setValue(pkgObjWithoutKey, newName, value);
    }
    throw `path ${path} does not exist`;
}

module.exports = { getValue, setValue, deleteKey, renameKey, appendValue };
