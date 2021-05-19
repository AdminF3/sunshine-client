import React, { Component } from 'react';
import { connect } from 'react-redux';

import Markdown from '../../utils/Markdown/Markdown';
import ProgressBar from '../../utils/ProgressBar';

import { getMarkdown, updateMarkdown } from '../../../actions/projects';

class Annex8 extends Component {
    UNSAFE_componentWillMount() {
        const { getMarkdown, projectId } = this.props;
        getMarkdown(projectId);
    }

    render() {
        const { markdown, updateMarkdown, isFetchingMarkdown, projectId } = this.props;

        return (
            isFetchingMarkdown
                ?
                <ProgressBar />
                :
                <Markdown
                    updateMarkdown={updateMarkdown}
                    markdown={markdown}
                    projectId={projectId}
                />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isFetchingMarkdown: state.project.isFetchingMarkdown,
        markdown: state.project.markdown,
        projectId: state.project.singleProject._id
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getMarkdown: (id) => {
            dispatch(getMarkdown(id));
        },
        updateMarkdown: (id, markdown) => {
            dispatch(updateMarkdown(id, markdown));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Annex8);
