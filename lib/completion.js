function fromObj(json) {
    function getKeys(obj, prefix = '') {
        const ret = []
        if (typeof obj === 'object' && obj !== null) {
            Object.entries(obj).forEach(([key, val]) => {
                let kk;
                if (prefix) {
                    if (Array.isArray(obj)) {
                        kk = `${prefix}[${key}]`
                    } else {
                        kk = `${prefix}.${key}`
                    }
                } else {
                    kk = key
                }
                ret.push(kk)
                if (typeof val === 'object') {
                    ret.push(...getKeys(val, kk))
                }
            })
        }
        return ret
    }
    return getKeys(json);
}

function fromObjFiltered(json, start) {
    return fromObj(json).filter(key => key.startsWith(start))
}

module.exports = { fromObj, fromObjFiltered }
