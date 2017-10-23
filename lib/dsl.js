function getDependencies(pkgObj, query='') {
    switch (query) {
        case 'prod':
            return pkgObj.dependencies;
        case 'dev':
            return pkgObj.devDependencies;
        case 'peer':
            return pkgObj.peerDependencies;
        case 'opt':
            return pkgObj.optionalDependencies;
        case 'bun':
            return pkgObj.bundleDependencies;
        case '':
            return `
dependencies:
${getDependencies(pkgObj, 'prod')}
devDependencies:
${getDependencies(pkgObj, 'dev')}
peerDependencies:
${getDependencies(pkgObj, 'peer')}
optionalDependencies:
${getDependencies(pkgObj, 'opt')}
bundleDependencies:
${getDependencies(pkgObj, 'bun')}
`;
        default:
        throw `Invalid query: ${query}`;
    }
}
