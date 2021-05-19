function _diff(a, b, ignoreKeys = []) {
  return Object.keys(a).reduce((acc, k) => {
    if (JSON.stringify(a[k]) !== JSON.stringify(b[k]) && ignoreKeys.indexOf(k.toLowerCase()) === -1) {
      acc[k] = a[k];
    }

    return acc;
  }, {});
}

export default _diff;
