import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { Query, Mutation } from '@apollo/react-components';
import {
    CloudDownload as DownloadIcon,
} from '@material-ui/icons';

import {
    CircularProgress,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    Typography,
    withStyles,
}
from '@material-ui/core';
import DeleteForever from '@material-ui/icons/DeleteForever';

import MeetingRegister from '../OrganizationMeetingsRegister/MeetingRegister';
import { LIST_MEETINGS } from '../../../../actions/organizationsQueries';
import { DELETE_MEETING } from '../../../../actions/organizationsMutations';

import { SERVER as backendURL } from '../../../../constants/endpoints';

import styles from './styles';

class OrganizationMeetingsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerOpen: false,
            deleteOpen: false,
            meetingToDelete: null,
        };
        this.handleDeleteMeeting = this.handleDeleteMeeting.bind(this);
        this.handleOpenCloseRegister = this.handleOpenCloseRegister.bind(this);
        this.handleOpenCloseDelete = this.handleOpenCloseDelete.bind(this);
    }

    handleDeleteMeeting(meetingId, deleteMeeting) {
        deleteMeeting({ variables: { id: meetingId } });
        this.handleOpenCloseDelete();
    }

    handleOpenCloseRegister(action) {
        this.setState({ registerOpen: Boolean(action) });
    }

    handleOpenCloseDelete(meetingId) {
        this.setState({
            deleteOpen: Boolean(meetingId),
            meetingToDelete: meetingId ? meetingId : null
        });
    }

    render() {
        const {
            classes,
            organization,
            project,
            viewOnly,
            t
        } = this.props;

        const {
            registerOpen,
            deleteOpen,
            meetingToDelete
        } = this.state;

        const downloadURL = `${backendURL}/${project ? 'project' : 'organization'}/${project ? project : organization.id}/meetings`;

        return (
            <Query
                query={LIST_MEETINGS}
                variables={{
                    id: project ? project : organization.id
                }}
            >
                {({ data, loading, error }) => {
                    if (error) {
                        return null;
                    }
                    if (loading) {
                        return (
                            <div className={classes.contentWrapper}>
                                <CircularProgress />
                            </div>
                        );
                    }
                    const meetings = data ? data.listMeetings : [];

                    return (
                        <Mutation
                            mutation={DELETE_MEETING}
                            refetchQueries={[
                                {
                                    query: LIST_MEETINGS,
                                    variables: {
                                        id: organization.id
                                    }
                                }
                            ]}
                        >
                            {(deleteMeeting) => {
                                return (
                                    <div className={classes.container}>
                                        <List disablePadding>
                                            <div className={`row ${classes.header}`}>
                                                <Typography className={classes.meetingsTitle}>
                                                    {t('translations:meetings.meetings')}
                                                </Typography>
                                                <div
                                                    className={classes.buttonsContainer}
                                                >
                                                    <Button
                                                        disabled={viewOnly || meetings.length < 1}
                                                        variant="contained"
                                                        className={classes.exportCSV}
                                                        startIcon={<DownloadIcon />}
                                                        color="primary"
                                                        href={downloadURL}
                                                        download
                                                    >
                                                        {t('translations:meetings.exportMeetingsCSV')}
                                                    </Button>

                                                    <Button
                                                        disabled={viewOnly}
                                                        variant="contained"
                                                        color="secondary"
                                                        onClick={() => this.handleOpenCloseRegister('open')}
                                                    >
                                                        {t('translations:meetings.create')}
                                                    </Button>

                                                </div>
                                            </div>
                                            <div className={`row ${classes.subHeader}`}>
                                                <div className="col-xs-4">
                                                    {t('translations:meetings.purpose')}
                                                </div>
                                                <div className="col-xs-4">
                                                    {t('translations:meetings.location')}
                                                </div>
                                                <div className="col-xs-2">
                                                    {t('translations:meetings.date')}
                                                </div>
                                            </div>
                                            <div className={classes.listBody}>
                                                {meetings.map((meeting, index) => {
                                                    return (
                                                        <div
                                                            className={classes.listItem}
                                                            key={meeting.ID}
                                                        >
                                                            <ListItem
                                                                key={index}
                                                                to={`/meeting/${meeting.ID}`}
                                                                className={classes.width100}
                                                                style={{ textDecoration: 'none' }}
                                                                component={viewOnly ? 'div' : Link}
                                                            >
                                                                <ul className={`col-xs-4 ${classes.listItemCol}`}>
                                                                    {meeting.name}
                                                                </ul>
                                                                <div className={`col-xs-4 ${classes.listItemCol}`}>
                                                                    {meeting.location}
                                                                </div>
                                                                <div className={`col-xs-2 ${classes.listItemCol}`}>
                                                                    {new Date(meeting.date).toLocaleDateString('de-DE')}
                                                                </div>
                                                            </ListItem>
                                                            <IconButton
                                                                disabled={viewOnly}
                                                                className={classes.iconButton}
                                                                onClick={() => this.handleOpenCloseDelete(meeting.ID)}
                                                            >
                                                                <DeleteForever />
                                                            </IconButton>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </List>
                                        <MeetingRegister
                                            host={organization.id}
                                            open={registerOpen}
                                            close={() => this.handleOpenCloseRegister(false)}
                                            handleClose={this.handleOpenCloseRegister}
                                            organization={organization}
                                            project={project}
                                        />
                                        <ConfirmDelete
                                            isOpen={deleteOpen}
                                            handleOpenCloseDelete={this.handleOpenCloseDelete}
                                            handleDeleteMeeting={this.handleDeleteMeeting}
                                            deleteMeeting={deleteMeeting}
                                            meetingToDelete={meetingToDelete}
                                            t={t}
                                        />
                                    </div>
                                );
                            }}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }
}

OrganizationMeetingsList.propTypes = {
    viewOnly: PropTypes.bool.isRequired,
};

OrganizationMeetingsList.defaultProps = {
    viewOnly: false,
};

export default withStyles(styles)(withTranslation('translations')(OrganizationMeetingsList));

function ConfirmDelete(props) {
    const {
        isOpen,
        handleOpenCloseDelete,
        handleDeleteMeeting,
        deleteMeeting,
        meetingToDelete,
        t
    } = props;

    return (
        <Dialog
            open={isOpen}
            onClose={() => handleOpenCloseDelete()}
        >
            <DialogTitle>
                {t('translations:meetings.confirmDelete')}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {t('translations:meetings.areYouSure')}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => handleOpenCloseDelete()}
                >
                    {t('translations:navigation.no')}
                </Button>
                <Button
                    onClick={() => handleDeleteMeeting(meetingToDelete, deleteMeeting)}
                    autoFocus
                >
                    {t('translations:navigation.yes')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
