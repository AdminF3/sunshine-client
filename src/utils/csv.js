export function compile(fields, data) {
  const rows = [[fields.map(f => f.title).join('\t')]];

  for (const i in data) {
    const d = data[i];
    const rd = [];
    for (const fi in fields) {
      const f = fields[fi].key;
      rd.push(`${d[f]}`.replace(/[\t|\n]/g, '').trim());
    }
    rows.push(rd.join('\t'));
  }

  return rows.join('\n');
}
