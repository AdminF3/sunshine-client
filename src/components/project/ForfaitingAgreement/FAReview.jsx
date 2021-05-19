import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
    Grid,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    makeStyles,
} from '@material-ui/core';
import {
    CheckCircle,
    Cancel
} from '@material-ui/icons';

import { isNullUUID, nullUUID } from '../../../utils/uuid';
import Collapsable from '../../utils/Collapsable';

const useStyles = makeStyles(theme => ({
    reviewLabel: {
        fontSize: '1.1rem',
        marginLeft: 10
    },
    rejectButton: {
        backgroundColor: theme.palette.error.light,
        color: '#FFFFFF',
        '&:hover': {
            backgroundColor: theme.palette.error.dark
        }
    },
    approved: {
        color: 'green',
    },
    rejected: {
        color: theme.palette.error.dark
    },
    commentsInput: {
        width: '100%'
    },
    singleReview: {
        marginTop: 30
    },
    dialogButton: {
        marginLeft: 10
    },
    reviewerInfo: {
        marginLeft: 20,
        marginTop: 10,
        color: '#7f8fa4'
    },
    sReviewInnerContainer: {
        display: 'flex',
        position: 'relative',
        justifyContent: 'space-between',

        '& .sReviewInner-title': {
            display: 'flex',
        }
    },
    reviewHint: {
        fontSize: '0.8rem',
        color: 'grey',
        marginTop: 10,
        marginLeft: 35
    },
    reviewHistoryList: {
        '& .MuiListItem-root': {
            '& .MuiListItemText-multiline': {
                margin: 0,
            },
            '& .MuiListItemText-secondary': {
                marginTop: 0,
            },
            '& .MuiListItemAvatar-root': {
                display: 'inine-flex',
                minWidth: 'auto',
                marginRight: 8,
            },
        },
    },
}));

function FAReview(props) {
    const {
        review,
        reviewHistory,
        projectID,
        disabled,
        handleReview,
        notice,
        buttonLabel,
    } = props;
    const classes = useStyles();
    const { t } = useTranslation('translations');

    if (!review) {
        return null;
    }

    let dialogButtonLabel = buttonLabel;
    if (!dialogButtonLabel) {
        dialogButtonLabel = review.type === 'MAINTENANCE' ? t('milestones.maintenanceReview') : t('forfaitingApplication.review');
    }

    return (
        <Grid container item xs={12} className={classes.singleReview}>
            <Grid item xs={12} className={classes.sReviewInnerContainer}>
                <div className="sReviewInner-title">
                    <ApproveIcon approved={review.approved} />
                    <Typography
                        className={`${review.approved ? classes.approved : classes.rejected} ${classes.reviewLabel}`}
                    >
                        {t(`projects.${review.type}`)}
                    </Typography>
                </div>
                <div>
                    {review.type === 'MAINTENANCE' &&
                        <Typography
                            component="a"
                            href={`/project/${projectID}/results-monitoring#1`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {t('milestones.goToAnnualCheck')}
                        </Typography>
                    }
                    <ReviewDialog
                        review={review}
                        handleReview={handleReview}
                        disabled={disabled}
                        buttonLabel={dialogButtonLabel}
                    />
                </div>
            </Grid>
            {review.type === 'MAINTENANCE' && (
                <Grid item xs={12}>
                    <Typography className={classes.reviewHint}>
                        {t('milestones.maintenanceReviewHint')}
                    </Typography>
                </Grid>
            )}
            {
                !review.author || isNullUUID(review.author.ID) ?
                    <Grid
                        className={classes.reviewerInfo}
                    >
                        <Typography color={notice ? 'error' : 'inherit'}>
                            {notice || t('forfaitingApplication.awaitingReview')}
                        </Typography>
                    </Grid> :
                    <React.Fragment>
                        <Grid
                            item
                            xs={12}
                            className={classes.z}
                        >
                            <Typography variant="caption">
                                {t('forfaitingApplication.reviewedBy')}:
                            </Typography>
                            <Typography>
                                {`${review.author.name} (${review.author.email})`}
                            </Typography>
                            <Typography variant="caption">
                                {t('meetings.date')}:
                            </Typography>
                            <Typography>
                                {moment(review.created_at).format('YYYY-MM-DD hh:mm')}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            className={classes.reviewerInfo}
                        >
                            <Typography variant="caption">
                                {t('forfaitingApplication.comments')}
                            </Typography>
                            <Typography>
                                {review.comment}
                            </Typography>
                        </Grid>
                        {reviewHistory.length > 0 && (
                            <Grid item xs={12}>
                                <Collapsable
                                    dividerTitle={`${t('forfaitingApplication.history')} (${reviewHistory.length})`}
                                >
                                    <List dense className={classes.reviewHistoryList}>
                                        {reviewHistory.map((rh, i) => {
                                            return (
                                                <ListItem key={i}>
                                                    <ListItemAvatar>
                                                        <ApproveIcon approved={rh.approved} />
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={
                                                            <React.Fragment>
                                                                {`${rh.author.name} (${rh.author.email})`} -&nbsp;
                                                                <Typography variant="caption">
                                                                    {moment(rh.created_at).format('YYYY-MM-DD hh:mm')}
                                                                </Typography>
                                                                <Typography variant="caption" display="block">
                                                                    - {rh.comment}
                                                                </Typography>
                                                            </React.Fragment>
                                                        }
                                                    />
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </Collapsable>
                            </Grid>
                        )}
                    </React.Fragment>
            }
        </Grid>
    );
}

function ReviewDialog(props) {
    const {
        buttonLabel,
        review,
        disabled,
    } = props;
    const classes = useStyles();
    const { t } = useTranslation('translations');
    const [isOpen, setIsOpen] = useState(false);
    const [comments, setComments] = useState('');

    function handleIsOpen() {
        setIsOpen(!isOpen);
    }

    const updateUUID = isNullUUID(review.author?.ID) ? review.ID : nullUUID

    return (
        <React.Fragment>
            <Button
                variant="contained"
                onClick={handleIsOpen}
                color="primary"
                className={classes.dialogButton}
                disabled={disabled}
            >
                {buttonLabel}
            </Button>
            <Dialog
                open={isOpen}
                onClose={handleIsOpen}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>
                    {`${review.type} Review`}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        className={classes.commentsInput}
                        variant="outlined"
                        label={review.type === 'MAINTENANCE' ? t('milestones.comments') : t('forfaitingApplication.leaveAComment')} // eslint-disable-line max-len
                        value={comments}
                        onChange={el => setComments(el.target.value)}
                        multiline
                        rows={3}
                        rowsMax={6}
                    />
                </DialogContent>
                <DialogActions>
                    {props.review.type !== 'MAINTENANCE' &&
                        <Button
                            variant="contained"
                            className={classes.rejectButton}
                            onClick={() => {
                                handleIsOpen();
                                props.handleReview(
                                    false, review.type, comments, updateUUID,
                                ).then(() => setComments(''));
                            }}
                        >
                            {t('transitionRequests.reject')}
                        </Button>
                    }
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            handleIsOpen();
                            props.handleReview(
                                true, review.type, comments, updateUUID,
                            ).then(() => setComments(''));
                        }}
                    >
                        {review.type === 'MAINTENANCE' ?
                            t('milestones.complete') :
                            t('adminActions.approve')
                        }
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

function ApproveIcon(props) {
    const { approved } = props;
    const classes = useStyles();

    if (approved) {
        return <CheckCircle className={`${classes.approved} ${classes.icons}`} />;
    }
    return <Cancel className={`${classes.rejected} ${classes.icons}`} />;
}

FAReview.propTypes = {
    review: PropTypes.object.isRequired,
    handleReview: PropTypes.func.isRequired,
    projectID: PropTypes.string.isRequired,
    reviewHistory: PropTypes.array.isRequired,
    notice: PropTypes.node,
    buttonLabel: PropTypes.node,
};

FAReview.defaultProps = {
    projectID: '',
    reviewHistory: [],
    notice: null,
    buttonLabel: null,
};

export default FAReview;
