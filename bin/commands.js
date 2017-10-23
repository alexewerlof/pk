function file(val) {

}

function count(pkgObj, key) {
    if (target is a non-null object) {
        print( Object.keys(target).length);
    } else if (target is array) {
        print( target.length);
    } else if (target !== undefined) {
        print( 1);
    } else {
        print( 0);
    }
}

function delete(pkgObj, key) {
    if (target is a non-null object) {
        print( deletekey(target, key));
    } else if (target is an array ) {
        print( deleteItem(target, value));
    }
}

function set(pkgObj, key, value, type) {
    if (target is undefined or null) {
        create an object at the requested path first and assign it to target;
    }
    update(pkgObj, key, value, type);
}

function update(pkgObj, key, value, type) {
    if (target is undefined or null) {
        create an object at the requested path first and assign it to target;
    }
    target[key] = typed(value, type);
}

function 

