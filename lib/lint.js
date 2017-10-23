const semver = require('semver')

function versionValid(versionField) {
    return semver.valid(versionField);
}

function getPart(version, part = 'major') {
    switch(part) {
        case 'major': return semver.major(version);
        case 'minor': return semver.minor(version);
        case 'patch': return semver.patch(version);
    }
}