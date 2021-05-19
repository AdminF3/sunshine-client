const matches = [
  { regex: /\$(.*?)\$/g, component: 'i' },
  { regex: /\^\{(.*?)\}/g, component: 'sup' },
  { regex: /\^([a-zA-Z\d]{1})/g, component: 'sup' },
  { regex: /_\{(.*?)\}/g, component: 'sub' },
  { regex: /_([a-zA-Z\d]{1})/g, component: 'sub' },
];

function _parseSpecialSymbols(str) {
  let value = str;
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];

    const m = str.match(match.regex);
    if (m) {
      value = value.replace(match.regex, (_, y) => {
        return `<${match.component}>${_parseSpecialSymbols(y)}</${match.component}>`;
      });
    }
  }

  return value;
}

export default _parseSpecialSymbols;
