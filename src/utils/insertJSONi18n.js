function _insert(src, str, loc) {
  try {
    const parsed = JSON.parse(src);
    parsed[loc] = str;

    return JSON.stringify(parsed);
  } catch {
    return str;
  }
}

export default _insert;
