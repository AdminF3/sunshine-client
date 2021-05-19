import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation } from '@apollo/client';
import {
    AppBar,
    Button,
    Grid,
    Typography,
    ListItemSecondaryAction,
    List,
    ListItem,
    ListItemText,
    Tooltip,
    IconButton,
    Dialog,
    Toolbar,
    makeStyles
} from '@material-ui/core';

import {
    Delete as DeleteIcon,
    Search as SearchIcon,
    Close as CloseIcon
} from '@material-ui/icons';

import apolloClient from '../../../utils/apolloClient';
import FAReviews from './FAReviews';
import Upload from '../../../containers/smartcomponents/UploadFile/UploadFile';
import ForfaitingDocuments from './ForfaitingDocuments';

import ENDPOINTS from '../../../constants/endpoints';
import { GET_FORFAITING_APPLICATION } from '../../../actions/projectsQueries';
import { REVIEW_FORFAITING_APPLICATION } from '../../../actions/projectsMutations';
import { uploadFile, deleteFile } from '../../../actions/uploads';

const useStyles = makeStyles(theme => ({
    outerContainer: {
        padding: '20px 50px',
        marginTop: 30
    },
    container: {
        backgroundColor: '#FFFFFF',
        padding: '0px 10px'
    },
    innerContainer: {
        marginBottom: 60
    },
    title: {
        fontSize: 20,
        marginTop: 20,
        marginBottom: 30
    },
    icons: {
        width: 26,
        height: 26
    },
    infoLabel: {
        fontSize: 18,
        color: '#7F8FA4'
    },
    infoText: {
        fontSize: 15,
        marginBottom: 30,
    },
    uploadContainer: {
        position: 'relative'
    },
    list: {
        '& .MuiListItem-container': {
            padding: `${theme.spacing(2)}px 0`,
            borderBottom: `1px solid ${theme.palette.divider}`,
        },
        '& .ListItem-progress': {
            borderBottom: `1px solid ${theme.palette.divider}`,
        },
        '& .MuiListItem-secondaryAction': {
            paddingRight: 230,
        },
        '& .MuiListItemText-secondary': {
            '& > span': {
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                    color: theme.palette.text.primary,
                },
            },
            '& .MuiIconButton-sizeSmall': {
                padding: 1,
                '&:first-child': {
                    marginLeft: theme.spacing(2),
                },
            },
        },
    },
    appBar: {
        position: 'relative'
    },
    closeButton: {
        position: 'absolute',
        right: 40
    },
    openButton: {
        marginTop: theme.spacing(4),
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(2),
    }
}));

function ForfaitingApplication(props) {
    const classes = useStyles();
    const { t } = useTranslation('translations');
    const { isOpen, handleIsOpen } = props;

    const [isDialogOpen, setIsDialogOpen] = useState(isOpen);
    let openHandler = setIsDialogOpen;
    let open = isDialogOpen; // eslint-disable-line no-shadow
    let renderOpenButton = true;
    if (handleIsOpen) {
        openHandler = handleIsOpen;
        open = isOpen;
        renderOpenButton = false;
    }

    const { data, refetch } = useQuery(GET_FORFAITING_APPLICATION, {
        client: apolloClient,
        variables: {
            id: props.project?.data?.ForfaitingApplication?.ID || '00000000-0000-0000-0000-000000000000'
        }
    });

    const [reviewForfaitingApplication] = useMutation(REVIEW_FORFAITING_APPLICATION, {
        client: apolloClient,
        refetchQueries: [
            {
                query: GET_FORFAITING_APPLICATION,
                variables: {
                    id: data?.getForfaitingApplication.ID
                }
            }
        ]
    });

    const fa = data?.getForfaitingApplication;
    const attachments = Object.values(props.project._attachments || []);
    const energyAudit = attachments.filter(el => el.upload_type === 'energy audit report');
    const renovationPlan = attachments.filter(el => el.upload_type === 'construction project');
    const preEPC = attachments.filter(el => el.upload_type === 'pre epc agreement');

    return (
        <React.Fragment>
            {renderOpenButton && (
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => openHandler(true)}
                    className={classes.openButton}
                    disabled={props.disabled}
                >
                    {t('forfaitingApplication.forfaitingApplicationApproval')}
                </Button>
            )}

            <Dialog
                open={open}
                onClose={() => openHandler(false)}
                fullScreen
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            {t('forfaitingApplication.forfaitingApplication')}
                        </Typography>
                        <IconButton className={classes.closeButton} color="inherit" onClick={() => openHandler(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <div className={classes.outerContainer}>
                    <Grid
                        container
                        className={classes.container}
                        spacing={6}
                    >
                        <ForfaitingInformation
                            fa={fa}
                            project={props.project}
                            energyAudit={energyAudit}
                            renovationPlan={renovationPlan}
                            preEPC={preEPC}
                            deleteDocument={props.deleteDocument}
                            refetch={refetch}
                        />
                        <Grid
                            item
                            xs={5}
                        >
                            <Typography
                                className={classes.title}
                            >
                                {t('forfaitingApplication.reviews')}
                            </Typography>
                            <Grid
                                item
                                xs={12}
                            >
                                <FAReviews
                                    reviewTypes={['TECHNICAL', 'GUIDELINES', 'FINANCIAL', 'EXECUTIVE']}
                                    buttonLabels={{ EXECUTIVE: 'Approve project for Forfaiting' }}
                                    faReviews={fa?.reviews}
                                    handleReview={(approved, type, comment, ID) => reviewForfaitingApplication({
                                        variables: {
                                            ID: fa.ID,
                                            review: { ID, approved, type, comment }
                                        }
                                    })}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Dialog>
        </React.Fragment>
    );
}

function ForfaitingInformation(props) {
    const classes = useStyles();
    const { t } = useTranslation('translations');

    return (
        <Grid
            container
            item
            xs={7}
        >
            <Grid
                container
                item
                className={classes.innerContainer}
                xs={12}
            >
                <Grid
                    item
                    xs={12}
                >
                    <Typography
                        className={classes.infoLabel}
                    >
                        {t('forfaitingApplication.forfaitingProccessManager')}
                    </Typography>
                    <Typography
                        className={classes.infoText}
                    >
                        {`${props.fa?.manager?.name} (${props.fa?.manager?.email})`}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <Typography
                        className={classes.infoLabel}
                    >
                        {t('forfaitingApplication.provideBankAccount')}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={6}
                >
                    <Typography
                        className={classes.infoLabel}
                    >
                        {t('forfaitingApplication.beneficiaryName')}
                    </Typography>
                    <Typography
                        className={classes.infoText}
                    >
                        {props.fa?.bankAccount?.beneficiaryName}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={6}
                >
                    <Typography
                        className={classes.infoLabel}
                    >
                        {t('forfaitingApplication.bankNameAddress')}
                    </Typography>
                    <Typography
                        className={classes.infoText}
                    >
                        {props.fa?.bankAccount?.bankNameAddress}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={6}
                >
                    <Typography
                        className={classes.infoLabel}
                    >
                        {t('forfaitingApplication.IBAN')}
                    </Typography>
                    <Typography
                        className={classes.infoText}
                    >
                        {props.fa?.bankAccount?.IBAN}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={6}
                >
                    <Typography
                        className={classes.infoLabel}
                    >
                        {t('forfaitingApplication.swift')}
                    </Typography>
                    <Typography
                        className={classes.infoText}
                    >
                        {props.fa?.swift}
                    </Typography>
                </Grid>
            </Grid>
            <Grid
                container
                item
                className={classes.innerContainer}
                xs={12}
            >
                <Grid
                    item
                    xs={12}
                >
                    <Typography
                        className={classes.infoLabel}
                    >
                        {t('forfaitingApplication.financialImplementation')}
                    </Typography>
                    <Typography
                        className={classes.infoText}
                    >
                        {props.fa?.finance}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    className={classes.uploadContainer}
                >
                    <UploadedDocuments
                        files={props.fa?.financialStatements}
                        upload_type="fa financial statements"
                        refetch={props.refetch}
                        fa={props.fa}
                        deleteDocument={props.deleteDocument}
                        translatedLabel="forfaitingApplication.financialStatements"
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    className={classes.uploadContainer}
                >
                    <UploadedDocuments
                        files={props.fa?.bankConfirmation}
                        upload_type="fa bank confirmation"
                        refetch={props.refetch}
                        fa={props.fa}
                        deleteDocument={props.deleteDocument}
                        translatedLabel="forfaitingApplication.bankConfirmation"
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <Typography
                        style={{ marginBottom: 20 }}
                    >
                        {t('forfaitingApplication.listOfRelevantDocuments')}
                    </Typography>
                    <ForfaitingDocuments
                        label={t('forfaitingApplication.energyAudit')}
                        missingLabel={t('forfaitingApplication.missingEnergyAudit')}
                        files={props.energyAudit}
                        projectId={props.project._id}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    className={classes.item}
                >
                    <ForfaitingDocuments
                        label={t('forfaitingApplication.renovationPlan')}
                        missingLabel={t('forfaitingApplication.missingRenovationPlan')}
                        files={props.renovationPlan}
                        projectId={props.project._id}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    className={classes.item}
                >
                    <ForfaitingDocuments
                        label={t('forfaitingApplication.preEPC')}
                        missingLabel={t('forfaitingApplication.missingPreEPC')}
                        files={props.preEPC}
                        projectId={props.project._id}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
}

function UploadedDocuments(props) {
    const classes = useStyles();
    const { t } = useTranslation('translations');

    return (
        <List className={classes.list}>
            <ListItem>
                <ListItemText
                    primary={t(props.translatedLabel)}
                    secondary={
                        props.files?.map(file => {
                            return (
                                <span key={file.name}>
                                    {file.name}
                                    <Tooltip placement="top" title={t('documents.delete')}>
                                        <IconButton
                                            size="small"
                                            onClick={() => props.deleteDocument(file.name, { id: props.fa.ID, type: 'forfaitinga' }, props.refetch)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip placement="top" title={t('documents.download')}>
                                        <IconButton
                                            size="small"
                                            component="a"
                                            href={ENDPOINTS.SERVER + '/forfaitinga/' + props.fa.ID + '/' + file.name}
                                            download
                                            target="_blank"
                                        >
                                            <SearchIcon />
                                        </IconButton>
                                    </Tooltip>
                                </span>
                            );
                        })
                    }
                />
                <ListItemSecondaryAction>
                    <Upload
                        entity={{
                            id: props.fa?.ID,
                            attachments: props.files || [],
                            type: 'forfaitinga',
                            uploadType: props.upload_type
                        }}
                        buttonOnly
                        canUpload
                        onSuccess={props.refetch}
                    />
                </ListItemSecondaryAction>
            </ListItem>
        </List>
    );
}

ForfaitingApplication.defaultProps = {
    isOpen: false
};

export default connect(
    state => ({
        project: state.project.refetchProject,
    }),
    dispatch => ({
        uploadDocument: (file, entity, onSuccess) => dispatch(
            uploadFile(file, entity, { onSuccess, withoutAlert: true })
        ),
        deleteDocument: (documentName, entity, onSuccess) => dispatch(
            deleteFile(documentName, entity, { onSuccess, withoutAlert: true })),
    })
)(ForfaitingApplication);
