function getType(path) {
    switch (path) {
    case 'name':
    case 'version':
    case 'license':
        return 'string';
    }
}

function lint(pkgObject) {
    
}