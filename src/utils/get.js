/**
 * get gets value from array by provided path. This is a
 * dumbed-down version of lodash's `get` function, with a
 * slight difference in behaviour when called with a path of
 * '[]' (empty path).
 *
 * @param {*} obj - Object to deep-access.
 * @param {Array} path - Path to go through.
 * @param {*} [defaultValue=undefined] - value returned if
 * the property does not exist.
 *
 * @returns {*} - The requested value or `defaultValue`.
 */
function _get(obj, path, defaultValue) {
  if (!path || (path && path.length === 0)) {
    return obj;
  }
  if (!obj.hasOwnProperty(path[0])) {
    return defaultValue;
  }
  return _get(obj[path[0]], path.slice(1), defaultValue);
}

export default _get;
