function getKeys(obj, prefix = '') {
    const keys = []
    if (typeof obj === 'object' && obj !== null) {
        Object.entries(obj).forEach(([key, val]) => {
            let path;
            if (prefix) {
                if (Array.isArray(obj)) {
                    path = `${prefix}[${key}]`
                } else {
                    path = `${prefix}.${key}`
                }
            } else {
                path = key
            }
            keys.push(path)
            if (typeof val === 'object') {
                keys.push(...getKeys(val, path))
            }
        })
    }
    return keys
}

function keepStartingWith(arr, start) {
    return arr.filter(key => key.startsWith(start))
}

function sortByLength(arr) {
    return arr.sort((a, b) => {
      const ret = a.length - b.length
      if (ret === 0) {
          if (a === b) {
            return 0
          }
          return a > b ? 1 : -1
      }
      return ret
    })
}

function pathCompletion(json, start) {
    return sortByLength(keepStartingWith(getKeys(json), start))
}

module.exports = { getKeys, pathCompletion }
