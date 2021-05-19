import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
} from '@material-ui/core';

function MarkdownText(props) {
  const { text } = props;

  const lines = Array.isArray(text) ? text : [text];

  return (
    <React.Fragment>
      {lines.map((l, i) => (
        <Parsed
          key={i}
          component={props.component}
          gutterBottom={props.gutterBottom}
          variant={props.variant}
        >
          {l}
        </Parsed>
      ))}
    </React.Fragment>
  );
}

function Parsed(props) {
  const { children, ...typographyProps } = props;

  const text = children
    .replace(/^### (.*$)/gmi, '<h3>$1</h3>')
    .replace(/^## (.*$)/gmi, '<h2>$1</h2>')
    .replace(/^# (.*$)/gmi, '<h1>$1</h1>')
    .replace(/^> (.*$)/gmi, '<blockquote>$1</blockquote>')
    .replace(/\*\*(.+?)\*\*/gmi, '<b>$1</b>')
    .replace(/\*(.+?)\*/gmi, '<i>$1</i>');
  return (
    <Typography {...typographyProps} dangerouslySetInnerHTML={{ __html: text }} />
  );
}

MarkdownText.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  component: PropTypes.elementType,
  gutterBottom: PropTypes.bool,
};

MarkdownText.defaultProps = {
  component: 'p',
  variant: 'inherit',
  gutterBottom: true,
};

export default MarkdownText;
