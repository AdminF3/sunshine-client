export function query(o) {
  const q = [];

  const qKeys = Object.keys(o);
  for (const i in qKeys) {
    const k = qKeys[i];
    const v = o[k];

    if (Array.isArray(v)) {
      for (const vi in v) {
        q.push(`${k}=${v[vi]}`);
      }
    } else {
      q.push(`${k}=${v}`);
    }
  }

  return q.join('&');
}
