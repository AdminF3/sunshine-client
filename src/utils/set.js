/**
 * set sets value in object by provided path. This is a
 * dumbed-down version of lodash's `set` function, with a
 * slight difference in behaviour when called with a path of
 * '[]' (empty path).
 *
 * @param {*} obj - Object to deep-access.
 * @param {Array} path - Path to go through.
 * @param {*} [value] - value to set.
 *
 * @returns {*} - The updated or original object.
 */

function _set(obj, path, value) {
  if (!path || (path && path.length === 0) || !obj) {
    return obj;
  }

  if (path.length === 1) {
    obj[path[0]] = value;

    return obj;
  }

  return _set(obj[path[0]], path.slice(1), value);
}

export default _set;
