import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';
import {
  Button,
  makeStyles,
} from '@material-ui/core';

import { getMarkdown as getMarkdownAction, updateMarkdown as updateMarkdownAction } from '../../../actions/projects';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './styles';

const useStyles = makeStyles(styles);

function Markdown(props) {
  const {
    project,
    getMarkdown,
    updateMarkdown,
  } = props;
  const classes = useStyles();
  const { t } = useTranslation('translations');

  const projectID = project.singleProject._id;
  const isFetchingMarkdown = project.isFetchingMarkdown;

  const [editorState, setEditorState] = useState(null);

  const fetchMarkdown = useCallback(() => {
    if (!projectID || isFetchingMarkdown || editorState) {
      return;
    }
    getMarkdown(projectID).then((m) => {
      const d = markdownToDraft(m);
      const es = EditorState.createWithContent(convertFromRaw(d));
      setEditorState(es);
    });
  }, [projectID, isFetchingMarkdown, editorState, getMarkdown]);

  useEffect(() => {
    fetchMarkdown();
  }, [fetchMarkdown]);

  const onEditorStateChange = (es) => {
    setEditorState(es);
  };
  const onUpdate = () => {
    if (!editorState) {
      return;
    }

    const d = convertToRaw(editorState.getCurrentContent());
    const m = draftToMarkdown(d);
    updateMarkdown(projectID, m);
  };

  if (!editorState) {
    return null;
  }

  return (
    <React.Fragment>
      <div className={`row ${classes.container}`} >
        <div className="col-xs-12">
          <Editor
            editorState={editorState}
            wrapperClassName={classes.wrapper}
            editorClassName={classes.editor}
            onEditorStateChange={onEditorStateChange}
            toolbar={{
              options: ['inline', 'list', 'blockType'],
              inline: { options: ['bold', 'italic', 'strikethrough'] },
              blockType: { options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'] },
            }}
          />
        </div>
      </div>
      <Button
        variant="contained"
        color="secondary"
        onClick={onUpdate}
        disabled={isFetchingMarkdown}
      >
        {t('meetings.save')}
      </Button>
    </React.Fragment>
  );
}

export default connect(
  state => ({
    project: state.project,
  }),
  dispatch => ({
    getMarkdown: (projectID) => dispatch(getMarkdownAction(projectID)),
    updateMarkdown: (projectID, data) => dispatch(updateMarkdownAction(projectID, data)),
  }),
)(Markdown);
