import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useMutation } from '@apollo/client';
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    TextField,
    Button,
    Grid,
    Typography,
    IconButton,
    Paper,
    makeStyles
} from '@material-ui/core';
import {
    Folder as FolderIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
    Comment as CommentsIcon,
} from '@material-ui/icons';

import apolloClient from '../../../utils/apolloClient';
import { refetchSingleProject } from '../../../actions/projects';
import { deleteFile } from '../../../actions/uploads';
import { COMMENT_PROJECT } from '../../../actions/projectsMutations';

import Upload from '../../../containers/smartcomponents/UploadFile/UploadFile';
import Tooltip from '../../utils/TooltipWrapper';
import TextWithIcon from '../../utils/TextWithIcon';

import ENDPOINTS from '../../../constants/endpoints';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(2),
    },
    heading: {
        paddingTop: theme.spacing(2),
        paddingLeft: theme.spacing(2),
    },
    uploadActions: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(2),
        justifyContent: 'flex-end',
    },
    withPadding: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    commentBody: {
        backgroundColor: '#F8F8F8',
        borderRadius: 10,
    },
    commentBy: {
        textAlign: 'right',
        marginBottom: 20,
    },
    noCommentsColor: {
        color: theme.palette.action.disabled,
    },
    textField: {
        width: '100%'
    },
    submitButton: {
        float: 'right',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    }
}));

function CommentsAndUploads(props) {
    const classes = useStyles('translations');
    const { t } = useTranslation('translations');
    const [comm, setComm] = useState('');
    const {
        project,
        uploadType,
        entity,
        deleteDocument,
        refetchSingleProjectAction,
        commentsTopic,
        disabled,
        comment,
        renderElements
    } = props;

    const [commentProject] = useMutation(COMMENT_PROJECT, {
        client: apolloClient,
        onCompleted: () => refetch()
    });
    const comments = project?.data?.Comments?.filter(c => c.Topic === commentsTopic) || [];
    const refetch = () => refetchSingleProjectAction(project._id);

    const attachments = Object.values(project._attachments || []).filter(
        f => f.upload_type === uploadType && f.comment === comment
    );

    return (
        <Grid container spacing={2} className={classes.root}>
            {renderElements.map((el, i) => el === 'uploads' ?
                <Grid key={i} item sm={12} md={12 / renderElements.length}>
                    <props.component>
                        <TextWithIcon icon={<FolderIcon color="disabled" />} className={classes.heading}>
                            {t('milestones.otherUploads')}
                        </TextWithIcon>
                        <List dense>
                            {attachments.map(a => (
                                <ListItem key={a.ID}>
                                    <ListItemText
                                        secondary={a.name}
                                    />
                                    <ListItemSecondaryAction>
                                        <Tooltip placement="top" title={t('documents.delete')} disabled={disabled}>
                                            <IconButton
                                                size="small"
                                                onClick={() => deleteDocument(a.name, entity, refetch)}
                                                disabled={disabled}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip placement="top" title={t('documents.download')} disabled={disabled}>
                                            <IconButton
                                                size="small"
                                                component="a"
                                                href={ENDPOINTS.SERVER + `/${entity.type}/` + entity.id + '/' + a.name}
                                                download
                                                target="_blank"
                                                disabled={disabled}
                                            >
                                                <SearchIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                            <ListItem className={classes.uploadActions}>
                                <Upload
                                    entity={{
                                        id: project._id,
                                        attachments: Object.values(project._attachments || []).filter(
                                            (file) => file.upload_type === uploadType && file.comment === comment
                                        ),
                                        type: 'project',
                                        uploadType,
                                        comment
                                    }}
                                    loggedUserRole="member"
                                    buttonOnly
                                    canUpload
                                    onSuccess={refetch}
                                    disabled={disabled}
                                />
                            </ListItem>
                        </List>
                    </props.component>
                </Grid> :
                <Grid key={i} item xs={12} md={12 / renderElements.length}>
                    <Grid container item component={props.component} xs={12} direction="column">
                        <TextWithIcon icon={<CommentsIcon color="disabled" />} className={classes.heading}>
                            {t('milestones.commentsByTama')}
                        </TextWithIcon>

                        <List dense className={classes.withPadding}>
                            {comments.length === 0 ? (
                                <ListItem>
                                    <ListItemText className={classes.noCommentsColor}>
                                        {t('milestones.noCommentsYet')}
                                    </ListItemText>
                                </ListItem>) :
                                comments.map((c, j) => {
                                    return (
                                        <React.Fragment key={j}>
                                            <ListItem
                                                className={classes.commentBody}
                                            >
                                                <ListItemText>
                                                    {c.Content}
                                                </ListItemText>
                                            </ListItem>
                                            <Typography
                                                className={classes.commentBy}
                                            >
                                                {`${c.Author?.Name} (${c.Author?.Email})`}
                                            </Typography>
                                        </React.Fragment>
                                    );
                                })}
                        </List>
                        <Grid item xs={12} className={classes.withPadding}>
                            <TextField
                                variant="outlined"
                                placeholder={t('milestones.leaveComment')}
                                className={classes.textField}
                                value={comm}
                                onChange={e => setComm(e.target.value)}
                                disabled={disabled}
                            />
                        </Grid>
                        <Grid item className={classes.withPadding}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.submitButton}
                                disabled={disabled || !comm}
                                onClick={() => commentProject({
                                    variables: {
                                        id: project._id,
                                        comment: comm,
                                        topic: commentsTopic
                                    }
                                }).then(() => setComm(''))}
                            >
                                {t('milestones.submit')}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
}

CommentsAndUploads.defaultProps = {
    renderElements: [
        'uploads',
        'comments',
    ],
    component: Paper,
    comment: '',
};

export default connect(
    state => ({
        project: state.project.refetchProject
    }),
    dispatch => ({
        refetchSingleProjectAction: (projectId) => dispatch(refetchSingleProject(projectId)),
        deleteDocument: (documentName, entity, onSuccess) => dispatch(deleteFile(documentName, entity, { onSuccess })),
    })
)(CommentsAndUploads);
