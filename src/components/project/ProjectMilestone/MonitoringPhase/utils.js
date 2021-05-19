import parseTitle from '../../../../utils/parseJSONi18n';

export function parseActivitiesRows(rows, keyMap, period, lang) {
  const parsedRows = [];

  const activities = rows.map(d => ({
    type: parseTitle(d[0], lang),
    freq: parseFrequency(d[1], period),
  }));

  activities.forEach((activity, i) => {
    const activityRows = [];
    const km = [...keyMap, i];
    for (let j = 0; j < activity.freq.frequency; j++) {
      const id = [km, j].join('-');
      activityRows.push({ id });
    }

    parsedRows.push({ title: activity.type, rows: activityRows });
  });

  return parsedRows;
}

export function parseFrequency(freq, period) {
  const f = freq.toLowerCase();
  if (f.indexOf('annual') === 0) {
    return { frequency: 1, label: 'annual' };
  }
  if (f.indexOf('month') === 0) {
    return { frequency: 12, label: 'monthly' };
  }
  let m = freq.match(/(\d)\smonths/);
  if (m) {
    return { frequency: Math.min(Math.floor(12 / parseInt(m[1], 10)), 12), label: freq };
  }
  m = freq.match(/(\d+)\syears/);
  if (m) {
    return { frequency: Math.min(Math.floor(period / parseInt(m[1], 10)), period), label: freq };
  }
  return { frequency: 0, label: 'NA' };
}
