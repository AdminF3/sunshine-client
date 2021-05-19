const fs = require('fs');
const path = require('path');

const primaryLocale = 'en';
const localesEnabled = ['at', 'bg', 'en', 'lv', 'pl', 'ro', 'sk'];
const filesEnabled = ['translations.json', 'tooltips.json'];

const translationsCSVpath = process.argv[2];
let csvSeparator = ',';
let csvExtension = 'csv';
if (process.argv[3] === 'tab') {
  csvSeparator = '\t';
  csvExtension = 'tsv';
}

const primaryJSON = {};
const list = fs.readdirSync(path.resolve(__dirname, `../public/locales/${primaryLocale}`));
list.forEach(f => {
  if (filesEnabled.indexOf(f) === -1) {
    return;
  }
  const raw = fs.readFileSync(path.resolve(__dirname, `../public/locales/${primaryLocale}/${f}`));
  primaryJSON[f] = JSON.parse(raw);
});

fs.readdir(path.resolve(__dirname, '../public/locales'), (err, paths) => {
  if (err) {
    throw err;
  }

  paths.forEach(p => {
    if (p === primaryLocale || localesEnabled.indexOf(p) === -1) {
      return;
    }

    filesEnabled.forEach(f => {
      const workingPath = path.resolve(__dirname, `../public/locales/${p}/${f}`);
      let workingJSON = {};
      if (fs.existsSync(workingPath)) {
        const raw = fs.readFileSync(workingPath);
        workingJSON = JSON.parse(raw);
      }
      let toInsertJSON = {};
      let toInsertMap = {};

      if (translationsCSVpath) {
        const translationCSVP = path.resolve(translationsCSVpath, p, f.replace('json', csvExtension));
        if (fs.existsSync(translationCSVP)) {
          const rawCSV = fs.readFileSync(translationCSVP).toString();
          const j = csvToJSON(rawCSV);
          if (!j) {
            toInsertMap = csvToMap(rawCSV);
          } else {
            toInsertJSON = j;
          }
        }
      }

      const res = compareAndEnsure(primaryJSON[f], workingJSON, toInsertJSON, toInsertMap);

      // TODO (edimov): The commented out lines will parse the output
      // JSON as CSV. Implement script param switch for this logic.
      //
      // const csvRows = [['Key', 'Original', 'Translation'].join('\t')];
      // toCSV(res, primaryJSON[f], csvRows);
      // fs.writeFileSync(workingPath.replace('.json', '.csv'), csvRows.join('\n'), 'utf8');

      fs.writeFileSync(workingPath, JSON.stringify(res, null, 2), 'utf8');
    });
  });
});

// eslint-disable-next-line
function toCSV(jsonObj, originObj, rows, currKey = '') {
  const keys = Object.keys(jsonObj);

  for (const i in keys) {
    const k = keys[i];
    const v = jsonObj[k];
    const ov = originObj[k];
    const kk = currKey ? `${currKey}__${k}` : k;

    if (typeof v === 'string') {
      if (v === ov) {
        rows.push([kk, ov, ''].join('\t'));
      } else {
        rows.push([kk, ov, v].join('\t'));
      }
      continue;
    }

    toCSV(v, ov, rows, kk);
  }
}

function compareAndEnsure(src, cmp = {}, ins = {}, transMap = {}) {
  const out = Array.isArray(src) ? [] : {};

  Object.entries(src).forEach((e) => {
    const k = e[0];
    const v = e[1];

    if (typeof v === 'string') {
      // The regex below ensures that the provided translation
      // string has not tempered the named dynamic variable.
      const mIns = ins[k]?.match(/(\{+\w+\}+)/gi);
      const mSrc = src[k]?.match(/(\{+\w+\}+)/gi);
      if (mIns && mSrc) {
        ins[k] = ins[k].replace(/(^")|("$)/g, '').replace(/""/g, '"');
        for (let i = 0; i < mIns.length; i++) {
          ins[k] = ins[k].replace(mIns[i], mSrc[i]);
        }
      }
      out[k] = ins[k] || transMap[v] || cmp[k] || v;
      return;
    }
    out[k] = compareAndEnsure(v, cmp[k], ins[k], transMap);
  });

  return out;
}

function csvToJSON(str) {
  const res = {};
  const rows = str.split('\n').map(v => v.trim()).filter(v => v.length > 2);
  let deepIndexParts = null;
  for (let i = 1; i < rows.length; i++) {
    const cols = rows[i].split(csvSeparator);
    if (cols[0].indexOf('__') === -1) {
      return null;
    }

    const kParts = cols[0].split('__');
    const kTrans = cols[3]?.trim() || cols[2]?.trim() || cols[1].trim();

    // Note (edimov): This whole creepy logic is here for deep
    // nested keys export in the .CSV files. Checking the output of
    // such an export might make this logic look more sane.
    const deepIndex = kParts.indexOf('|');
    if (deepIndex > 0) {
      if (deepIndex === kParts.length - 1) {
        const deepArrayKeys = deepIndexParts || kParts;
        deepArrayKeys.splice(-1, 1);
        deepIndexParts = [...deepArrayKeys, cols[1]];
        continue;
      }
      insert([...deepIndexParts, ...kParts.slice(-1), kTrans], res);
    } else {
      deepIndexParts = null;
      insert([...kParts, kTrans], res);
    }
  }

  return res;
}

function csvToMap(str) {
  const res = {};
  const rows = str.split('\n').map(v => v.trim()).filter(v => v.length > 2);
  for (let i = 1; i < rows.length; i++) {
    const cols = rows[i].split(csvSeparator);
    res[cols[0].trim()] = cols[1];
  }

  return res;
}

function insert(arr, obj) {
  const [k, ...rest] = arr;
  if (rest.length === 1) {
    obj[k] = rest[0];
  } else {
    if (!obj[k]) {
      obj[k] = {};
    }
    insert(rest, obj[k]);
  }
}
