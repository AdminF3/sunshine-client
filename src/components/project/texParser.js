import parseTex from 'texjs-parser';

import parseSpecialSymbols from '../../utils/parseSpecialSymbols';

export function parse(texString) {
  // Replace tabs after the control word item so that
  // the parser won't process as two separate entries.
  // Replace new lines only in middle of sentences so
  // that `parseTex` won't join words from next line.
  const rawArr = parseTex(texString
    .replace(/item\t/g, 'item ')
    .replace(/([\r\n|\n|\r])(\w)/gi, ' $2')
    .replace(/\^?\\circ C/g, '°C')
    .replace(/\\rho/g, 'ρ')
    .replace(/\\theta/g, 'θ')
    .replace(/\\times/g, '×')
    .replace(/%\s?(chktex \d+\s?)+/g, '')
    .replace(/\\%/g, '%')
    .replace(/\{(\D{1})\}/g, '$1')
    .replace(/\\left/g, '')
    .replace(/\\right/g, '')
    .replace(/\\par/g, '')
    .replace(/\\topskip\dpt/g, '')
    .replace(/\\vspace.?\s?\{.*\}/g, '')
    .replace(/\\renewcommand.*\}/g, '')
  );

  for (const i in rawArr) {
    const node = rawArr[i];
    if (typeof node === 'string') {
      continue;
    }
    if (node.name !== 'document') {
      continue;
    }

    const rootNode = { kind: 'document', children: [] };
    appendNodes(node.children, rootNode);

    return mapPages(rootNode);
  }

  return [];
}

const kindTagsMap = {
  itemize: 'ul',
  enumerate: 'ol',
  section: 'h2',
  subsection: 'h4',
  subsubsection: 'h5',
  text: 'p',
  textB: 'strong',
  textInline: 'span',
};

const kindTagsArr = Object.keys(kindTagsMap);

function itemToHTML(item) {
  const tag = { component: 'li', children: [] };
  for (const i in item.title) {
    const t = item.title[i];
    if (t.kind !== 'text') {
      tag.children.push(t);
      continue;
    }
    tag.children.push(t.value);
  }
  if (item.children.length > 0) {
    tag.children.push(toHTML(item.children));
  }

  return tag;
}

function tableToHTML(item) {
  const tag = { component: 'table', children: [], props: { className: 'epc-inline-table' } };

  if (item.headers) {
    tag.children.push({
      component: 'thead',
      children: [
        {
          component: 'tr',
          children: item.headers.map(h => ({
            component: 'th',
            children: [itemToHTMLTag(h)],
          })),
        }
      ],
    });
  }
  if (item.rows.length > 0) {
    tag.children.push({
      component: 'tbody',
      children: item.rows.map(r => ({
        component: 'tr',
        children: r.map(c => ({
          component: 'td',
          children: [itemToHTMLTag(c)],
        })),
      })),
    });
  }

  return tag;
}

export function toHTML(children) {
  const components = [];
  for (let i = 0; i < children.length; i++) {
    const item = children[i];

    if (kindTagsArr.indexOf(item.kind) > -1) {
      components.push(itemToHTMLTag(item));
      continue;
    }

    if (item.kind === 'text-component') {
      components.push(
        {
          component: item.tag,
          children: [
            { component: 'span', props: { dangerouslySetInnerHTML: { __html: item.value } } },
            ...toHTML(item.children || []),
          ],
        }
      );
    }

    if (item.kind === 'inline-instruction') {
      const instructionNodes = toHTML(item.children);
      components.push({
        component: 'h4',
        props: { className: 'annex-inline-instruction' },
        children: instructionNodes,
      });
      continue;
    }

    if (item.kind === 'item') {
      components.push(itemToHTML(item));
      continue;
    }

    if (item.kind === 'center') {
      toHTML(item.children).map(c => components.push(c));
      continue;
    }

    if (item.kind === 'inline-table') {
      components.push(tableToHTML(item));
    }

    if (item.kind === 'table') {
      components.push(item);
    }

    if (item.kind === 'instruction') {
      components.push(item);
    }

    if (item.kind === 'frac') {
      components.push({
        component: 'span',
        props: { className: 'annex-fraction-instruction' },
        children: item.children?.map(c => c.value),
      });
    }
  }

  return components;
}

function itemToHTMLTag(item) {
  if (typeof item === 'string') {
    return item;
  }

  const t = kindTagsMap[item.kind];
  const tag = {
    component: t,
    children: [],
  };

  if (item.title) {
    tag.children.push(item.title);
  }
  if (item.value) {
    tag.children.push(item.value);
  }
  if (item.children) {
    tag.children.push(toHTML(item.children));
  }
  return tag;
}

function mapPages(n) {
  const pages = [];
  let pageIDX = 0;

  const len = n.children.length;
  for (let i = 0; i < len; i++) {
    if (!pages[pageIDX]) {
      pages[pageIDX] = { title: null, content: [] };
    }

    const item = n.children[i];
    if (item.kind === 'pagebreak') {
      // If current page has no content, but we receive
      // `pagebreak` instruction - no need to create new
      // page entry - rather reuse the existing empty one.
      if (pages[pageIDX].title === null && pages[pageIDX].content.length < 1) {
        continue;
      }
      pageIDX++;
      continue;
    }
    if (item.kind === 'FloatBarrier') {
      continue;
    }

    if (item.kind === 'section' && pages[pageIDX].title === null) {
      pages[pageIDX].title = item.title;
      continue;
    }
    pages[pageIDX].content.push(item);
  }

  return pages;
}

// lastTableNode holds the value of `% table: [a-z]` annotation
// used to render dynamic backend tables. If such a table will
// be rendered, we don't want to display it twice.
let lastTableNode;

// eslint-disable-next-line max-statements, complexity
function appendNodes(nodes, root) {
  let workingNode;
  let inWorkingNode;

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    // Check if current annotation will start parsing an inline
    // table. If this table has been already appended to the working
    // stack via the `kind: 'table'` - skip the parsing altogether.
    if (isTabuNode(node) && lastTableNode) {
      lastTableNode = null;
      continue;
    }

    const parsedNode = getNodeParsed(node);

    if (!parsedNode) {
      continue;
    }

    if (['center', 'multicols'].indexOf(parsedNode.kind) > -1 ) {
      parsedNode.children.map(c => root.children.push(c));
      continue;
    }

    // If appending to a text workingNode, but incoming node is
    // not of text type - reset the working node logic.
    if (isTextNode(workingNode) && !isTextNode(parsedNode)) {
      workingNode = null;
    }

    if (parsedNode.kind === 'table') {
      lastTableNode = parsedNode.value;
    }

    // Check if should close the working node before proceeding
    // with any other computations.
    if (inWorkingNode && inWorkingNode.shouldClose) {
      // If current node is text, but is preceeded by command node -
      // remove the value string as values will be duplicated.
      if (parsedNode.value) {
        parsedNode.value = parsedNode.value.replace(inWorkingNode.value, '');

        if (!parsedNode.value) {
          continue;
        }
      }

      inWorkingNode = null;
    }

    if (parsedNode.kind === 'item') {
      workingNode = { kind: 'item', title: null, children: parsedNode.children || [] };
      root.children.push(workingNode);

      continue;
    }

    if (parsedNode.kind === 'iffalse') {
      inWorkingNode = { kind: 'instruction', shouldClose: false, command: '', value: '', type: '' };
      continue;
    }

    if (parsedNode.kind === 'fi') {
      inWorkingNode.shouldClose = true;

      const childNode = workingNode?.children[workingNode.children.length - 1];
      if (childNode && !childNode.children) {
        childNode.children = [];
      }
      let appendTo;
      if (inWorkingNode.type === 'attachment') {
        appendTo = workingNode || root;
      } else {
        appendTo = childNode || workingNode || root;
      }

      if (appendTo.title) {
        appendTo.title.push(inWorkingNode);
        continue;
      }
      appendTo.children.push(inWorkingNode);
      continue;
    }

    // If `inWorkingNode` is instruction and current node
    // kind is text - this is the instruction's command.
    if (inWorkingNode?.kind === 'instruction') {
      // This should never happen, as an instruction TEX command
      // (marked by if-fi statements) should be always succeeded
      // by a text node.
      if (parsedNode.kind !== 'text') {
        console.warn(`TEX parse error: 'if-fi' block followed by non text node! ${parsedNode.kind}`); // eslint-disable-line no-console
        continue;
      }

      const command = parseCommand(parsedNode.value.trim());
      inWorkingNode.command = command.command;
      inWorkingNode.type = command.type;
      inWorkingNode.value = command.value;

      continue;
    }

    const appendTo = workingNode || root;
    // If no workingNode but if parsedNode IS `text` make it the working node
    // so that inline elements can stick together.
    if (!workingNode && parsedNode.kind === 'text') {
      workingNode = parsedNode;
    }

    if (appendTo.title && Array.isArray(appendTo.title)) {
      appendTo.title.push(parsedNode);
      continue;
    }

    // If workingNode is a text node - it has not been
    // interrupted by another non-text node - we need to
    // append the incoming text node to it as to not break
    // into multiple lines.
    if (appendTo.kind === 'text' && isTextNode(parsedNode)) {
      appendTo.children.push({
        kind: 'textInline',
        value: [':', ')'].indexOf(parsedNode.value[0]) > -1 ? parsedNode.value : ` ${parsedNode.value}`,
        children: parsedNode.children,
      });
      continue;
    }

    // If not appending to an 'item' node - no checks to make
    // further - just append to its children.
    if (appendTo.kind !== 'item') {
      appendTo.children.push(parsedNode);
      continue;
    }

    // If no last children items to append to - append to the
    // workingNode children themselves or if lastChild is
    // `inline-instruction` we don't want to append to its children, but
    // rather to its parent.
    const lastChild = appendTo.children[appendTo.children.length - 1];
    if (!lastChild?.children || lastChild.kind === 'inline-instruction') {
      appendTo.children.push(parsedNode);
      continue;
    }

    // If appending to a list item - no need for `text` node, which will
    // render as an additional `p` inside the `li` tag - use `span` instead.
    if (parsedNode.kind === 'text') {
      lastChild.children.push({
        kind: 'textInline',
        value: ` ${parsedNode.value}`,
      });
      continue;
    }

    // If the `parsedNode` is a 'text-component' make sure it renders
    // as a `span` instead of the default `p`.
    if (parsedNode.kind === 'text-component') {
      lastChild.children.push({
        ...parsedNode,
        value: ` ${parsedNode.value}`,
        tag: 'span',
      });
      continue;
    }

    appendTo.children.push(parsedNode);
    continue;
  }
}

const ignoreNodes = ['tabucline', 'rowfont', 'bfseries', 'mbox', 'vfill', 'url'];

function getNodeParsed(node) {
  if (typeof node === 'string') {
    return parseStringNode(node);
  }

  if (ignoreNodes.indexOf(node.name) > -1) {
    return null;
  }

  if (node.name === 'textbf') {
    return {
      kind: 'textInline',
      value: '',
      children: [
        {
          kind: 'textB',
          value: node.arguments[0].value,
        },
      ],
    };
  }

  if (isTabuNode(node)) {
    return tabuToTable(node);
  }

  if (node.name === 'frac' && node.arguments?.length > 0) {
    return {
      kind: 'frac',
      children: node.arguments,
    };
  }

  if (node.children) {
    const root = { kind: node.name, children: [] };
    appendNodes(node.children, root);
    return root;
  }

  if (['section', 'subsection'].indexOf(node.name) > -1) {
    const title = node.arguments[0].value;
    if (title.match(/\$(.*?)\$/)) {
      return { kind: 'text-component', value: parseSpecialSymbols(title), tag: 'h4' };
    }

    return { kind: node.name, title };
  }

  if (node.arguments?.length > 0) {
    return parseArgumentsNode(node);
  }

  return { kind: node.name };
}

// parseArgumentsNode extracts node children from its
// `arguments` array, rather than its `children`.
function parseArgumentsNode(argNode) {
  const root = { kind: argNode.name || 'inline-instruction', title: null, children: [] };
  if (!argNode.arguments?.length) {
    return root;
  }

  const children = [];
  for (let i = 0; i < argNode.arguments.length; i++) {
    const n = argNode.arguments[i];

    if (typeof n === 'string') {
      children.push(n);
      continue;
    }

    if (!n.value) {
      continue;
    }

    if (typeof n.value === 'string') {
      children.push(n.value);
      continue;
    }

    if (Array.isArray(n.value)) {
      n.value.map(v => children.push(v));
      continue;
    }
  }

  appendNodes(children, root);
  return root;
}

function parseStringNode(strNode) {
  if (strNode.trim() === '<no value>') {
    return null;
  }
  const value = strNode.trim();
  const m = value.match(/^%\stable:\s(.*)$/);
  if (m) {
    return { kind: 'table', value: m[1] };
  }
  if (!value || value.indexOf('%') === 0 || value === '[') {
    return null;
  }

  if (value.match(/\$(.*?)\$/)) {
    return { kind: 'text-component', value: parseSpecialSymbols(value), tag: 'p' };
  }

  return { kind: 'text', value, children: [] };
}

function parseCommand(v) {
  const m = v.match(/^(input|attachment).*value="(.*)".*$/);
  if (m) {
    return {
      command: v.replace(/\svalue="(.*)"/, ''),
      type: m[1],
      value: m[2],
    };
  }

  return { command: v, value: '' };
}

function tabuToTable(node) {
  const root = { kind: 'inline-table', rows: [] };
  let instructionNode = null;
  for (let i = 0; i < node.children.length; i++) {
    let child = node.children[i];

    const lastRow = root.rows[root.rows.length - 1];

    if (typeof child !== 'string') {
      if (child.name === 'iffalse') {
        instructionNode = { kind: 'instruction', command: '', value: '' };
      }

      if (child.name === 'fi') {
        if (!lastRow) {
          continue;
        }
        lastRow[lastRow.length - 1].children.push({ ...instructionNode });
        instructionNode = null;
      }
      continue;
    }
    child = child.trim();
    if (instructionNode) {
      const command = parseCommand(child);
      instructionNode.command = command.command;
      instructionNode.type = command.type;
      instructionNode.value = command.value;

      filterRowValues(lastRow, command.value);
      continue;
    }
    if (!child || child.indexOf('&') < 0) {
      continue;
    }

    const row = child.split('&').map(c => {
      const value = c.replace(/\\{2}\s?\[?.*\]?$/g, '').trim();
      return {
        kind: 'textInline',
        value,
        children: [],
      };
    });
    root.rows.push(row);
  }

  return root;
}

function filterRowValues(row, value) {
  for (const k in row) {
    if (row[k]?.value === value || row[k]?.value === '<no value>') {
      row[k].value = '';
    }
  }
}
const textKinds = ['text', 'textInline'];
function isTextNode(node) {
  return textKinds.indexOf(node?.kind) > -1;
}

const tabuKinds = ['tabu', 'longtabu'];
function isTabuNode(node) {
  return tabuKinds.indexOf(node?.name) > -1 || tabuKinds.indexOf(node?.kind) > -1;
}
