function _parse(title, loc) {
  if (!title) {
    return '';
  }

  try {
    const parsed = JSON.parse(title);
    if (loc in parsed) {
      return parsed[loc];
    }
    return title;
  } catch {
    return title.replace(/\{(.{1})\}/g, '$1');
  }
}

export default _parse;
