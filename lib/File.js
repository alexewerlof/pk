const fs = require('fs');
const util = require('util');
const detectIndent = require('detect-indent');

class File {
    constructor(fileName) {
        this.fileName = fileName;
    }

    async exists() {
        const stat = util.promisify(fs.stat);
        const fileStat = await stat(this.fileName);
        return stats.isFile();
    }

    async plain() {
        if (!this._plainCache) {
            const readFile = util.promisify(fs.readFile);
            this._plainCache = await readFile(this.fileName, 'utf8');
        }
        return this._plainCache;
    }

    async json() {
        return JSON.parse(await this.plain());
        if (!this._jsonCache) {
            this._jsonCache = JSON.parse(await this.plain());
        }
        return this._jsonCache;
    }

    /**
     * @see https://www.npmjs.com/package/detect-indent#api
     * @return {object} amount, type, indent
     */
    async indent() {
        return detectIndent(await this.plain());
    }

}

module.exports = File;