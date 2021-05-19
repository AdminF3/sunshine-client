import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import Dropzone from 'react-dropzone';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    Typography,
    TextField,
    InputLabel,
    FormControlLabel,
    Radio,
    Button,
    FormControl,
    Select,
    Chip,
    makeStyles
} from '@material-ui/core';
import {
    CloudUpload as UploadIcon,
} from '@material-ui/icons';

import ForfaitingDocuments from './ForfaitingDocuments';

import TooltipWrapper from '../../utils/TooltipWrapper';
import apolloClient from '../../../utils/apolloClient';

import { allowedMimeTypes } from '../../../utils/mimeTypes';
import { refetchSingleProject } from '../../../actions/projects';
import { uploadFile } from '../../../actions/uploads';
import { CREATE_FORFAITING_APPLICATION } from '../../../actions/projectsMutations';
import { canFinish } from '../../../utils/can';
import isSupportedCountry from '../../../utils/isSupportedCountry';

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: '#FFFFFF',
        paddingBottom: 40
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        margin: '20px 0px'
    },
    innerItem: {
        width: '100%'
    },
    button: {
        float: 'right'
    },
    checkboxLabel: {
        color: theme.palette.primary.dark,
        marginTop: 14,
        marginLeft: -3
    },
    dialogButton: {
        marginTop: 32,
        marginLeft: 16,
        marginBottom: 16
    },
    customSelect: {
        padding: '0px 5px',
        backgroundColor: '#FFFFFF',
        '& .MuiSelect-select': {
            backgroundColor: '#FFFFFF',
        }
    },
    documentsList: {
        display: 'flex',
        flexWrap: 'wrap',
        listStyle: 'none',
        margin: 0,
        padding: 0
    },
    chip: {
        maxWidth: 150,
        margin: 10
    },
    uploadContainer: {
        marginTop: 15
    },
    uploadsLabel: {
        marginBottom: 10,
        fontSize: 15
    },
    listOfDocumentsLabel: {
        marginBottom: 20
    },
    inputTitle: {
        marginBottom: 8
    },
    overrideSpacing: {
        padding: '0px 8px !important'
    },
    labelMargin: {
        marginTop: 20
    }
}));

const defaultState = {
    forfaitingManager: '',
    finance: '',
    privateBond: false,
    beneficiaryName: '',
    bankNameAddress: '',
    IBAN: '',
    swift: '',
    projectID: '',
    bankConfirmation: [],
    financialStatements: [],
};

const financeEnums = [
    'EQUITY',
    'BANK_FUNDING',
    'OTHER'
];

const requiredFields = [
    'forfaitingManager',
    'finance',
    'beneficiaryName',
    'bankNameAddress',
    'IBAN'
];

function ForfaitingForm(props) {
    const classes = useStyles();
    const { t } = useTranslation('translations');
    const [forfaitingData, setForfaitingData] = useState(defaultState);
    const {
        project,
        uploadDocument,
        refetchProject,
        isOpen,
        handleIsOpen,
        disabled,
    } = props;

    const [isDialogOpen, setIsDialogOpen] = useState(isOpen);
    let openHandler = setIsDialogOpen;
    let open = isDialogOpen; // eslint-disable-line no-shadow
    let renderOpenButton = true;
    if (handleIsOpen) {
        openHandler = handleIsOpen;
        open = isOpen;
        renderOpenButton = false;
    }

    const dataToSend = {
        forfaitingManager: forfaitingData.forfaitingManager,
        finance: forfaitingData.finance,
        privateBond: forfaitingData.privateBond,
        bankAccount: {
            beneficiaryName: forfaitingData.beneficiaryName,
            bankNameAddress: forfaitingData.bankNameAddress,
            IBAN: forfaitingData.IBAN
        },
        projectID: project._id,
        swift: forfaitingData.swift,
    };

    const refetch = () => refetchProject(project._id);

    const [createForfaitingApplication] = useMutation(CREATE_FORFAITING_APPLICATION, {
        client: apolloClient,
        variables: {
            forfaitingApplication: dataToSend
        },
        onCompleted: (response) => {
            const forfaitingID = response.createForfaitingApplication.ID;
            const projectID = response.createForfaitingApplication.project.ID;
            if (forfaitingData.financialStatements.length > 0) {
                const entity = {
                    id: forfaitingID,
                    type: 'forfaitinga',
                    uploadType: 'fa financial statements'
                };
                forfaitingData.financialStatements.map(file => uploadDocument(file, entity, null));
            }
            if (forfaitingData.bankConfirmation.length > 0) {
                const entity = {
                    id: forfaitingID,
                    type: 'forfaitinga',
                    uploadType: 'fa bank confirmation'
                };
                forfaitingData.bankConfirmation.map(file => uploadDocument(file, entity, null));
            }
            openHandler(false);
            refetch().then(props.history.push(`/project/${projectID}/asset-aquisition#forfaiting-application`));
        },
    });

    function handleCompleteForm() {
        createForfaitingApplication(forfaitingData);
    }

    const users = Object.values(project.dependencies || []).filter(el => el.type === 'user');
    const energyAudit = Object.values(project._attachments || []).filter(el => el.upload_type === 'energy audit report');
    const renovationPlan = Object.values(project._attachments || []).filter(el => el.upload_type === 'construction project'); // eslint-disable-line max-len
    const preEPC = Object.values(project._attachments || []).filter(el => el.upload_type === 'pre epc agreement');

    function requiredFilesPresent() {
        return energyAudit.length > 0 && energyAudit.length > 0 && energyAudit.length > 0;
    }

    const countryAllowed = isSupportedCountry(project.data.country);

    return (
        <React.Fragment>
            {renderOpenButton && (
                <TooltipWrapper
                    title={t('forfaitingApplication.availableForCountries')}
                    disabled={countryAllowed}
                >
                    <span style={{ display: 'inline-table' }}>
                        <Button
                            onClick={() => openHandler(true)}
                            variant="contained"
                            color="secondary"
                            className={classes.dialogButton}
                            disabled={disabled || !countryAllowed}
                        >
                            {t('forfaitingApplication.forfaitingApplicationForm')}
                        </Button>
                    </span>
                </TooltipWrapper>
            )}

            <Dialog
                open={open}
                onClose={() => openHandler(false)}
                maxWidth="lg"
            >
                <DialogTitle>
                    <Typography
                        className={classes.title}
                    >
                        {t('forfaitingApplication.forfaitingApplicationForm')}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid
                        container
                        className={classes.container}
                        spacing={2}
                    >
                        <Grid
                            item
                            xs={6}
                        >
                            <Typography
                                className={classes.inputTitle}
                            >
                                {t('forfaitingApplication.assignPerson')}
                            </Typography>
                            <FormControl
                                className={classes.innerItem}
                                required
                                variant="outlined"
                            >
                                <InputLabel className={classes.customSelect}>{t('forfaitingApplication.forfaitingProccessManager')}</InputLabel>
                                <Select
                                    native
                                    className={classes.customSelect}
                                    value={forfaitingData.forfaitingManager}
                                    onChange={e => setForfaitingData({ ...forfaitingData, forfaitingManager: e.target.value })}
                                >
                                    <option value="" />
                                    {users.map((item, i) => (
                                        <option
                                            key={i}
                                            value={item._id}
                                        >
                                            {item.data.name}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid
                            item
                            xs={6}
                        >
                            <Grid
                                xs={12}
                                item
                                className={classes.overrideSpacing}
                            >
                                <Typography>
                                    {t('forfaitingApplication.withWhichOption')}
                                </Typography>
                            </Grid>
                            <Grid
                                xs={12}
                                item
                                style={{ display: 'inline-flex' }}
                            >
                                <Grid
                                    item
                                    xs={6}
                                >
                                    <FormControlLabel
                                        value={forfaitingData.privateBond}
                                        className={classes.checkboxLabel}
                                        label={t('forfaitingApplication.standartFA')}
                                        control={
                                            <Radio
                                                checked={!forfaitingData.privateBond}
                                                onChange={() => setForfaitingData({ ...forfaitingData, privateBond: !forfaitingData.privateBond })}
                                                color="primary"
                                            />
                                        }
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={6}
                                >
                                    <FormControlLabel
                                        value={forfaitingData.privateBond}
                                        className={classes.checkboxLabel}
                                        label={t('forfaitingApplication.proceedWithPrivateBond')}
                                        control={
                                            <Radio
                                                checked={forfaitingData.privateBond}
                                                onChange={() => setForfaitingData({ ...forfaitingData, privateBond: !forfaitingData.privateBond })}
                                                color="primary"
                                            />
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            xs={12}
                            item
                            className={classes.overrideSpacing}
                        >
                            <Typography
                                className={classes.labelMargin}
                            >
                                {t('forfaitingApplication.provideBankAccount')}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={6}
                        >
                            <TextField
                                value={forfaitingData.beneficiaryName}
                                variant="outlined"
                                required
                                className={classes.innerItem}
                                label={t('forfaitingApplication.beneficiaryName')}
                                onChange={e => setForfaitingData({ ...forfaitingData, beneficiaryName: e.target.value })}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={6}
                        >
                            <TextField
                                value={forfaitingData.bankNameAddress}
                                variant="outlined"
                                required
                                className={classes.innerItem}
                                label={t('forfaitingApplication.bankNameAddress')}
                                onChange={e => setForfaitingData({ ...forfaitingData, bankNameAddress: e.target.value })}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={6}
                        >
                            <TextField
                                value={forfaitingData.IBAN}
                                variant="outlined"
                                required
                                className={classes.innerItem}
                                label={t('forfaitingApplication.IBAN')}
                                onChange={e => setForfaitingData({ ...forfaitingData, IBAN: e.target.value })}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={6}
                        >
                            <TextField
                                value={forfaitingData.swift}
                                variant="outlined"
                                className={classes.innerItem}
                                label={t('forfaitingApplication.swift')}
                                onChange={e => setForfaitingData({ ...forfaitingData, swift: e.target.value })}
                            />
                        </Grid>

                        <Grid
                            xs={6}
                            item
                        >
                            <Typography
                                className={classes.inputTitle}
                            >
                                {t('forfaitingApplication.confirmFinanceImplementation')}
                            </Typography>
                            <FormControl
                                className={classes.innerItem}
                                required
                                variant="outlined"
                            >
                                <InputLabel className={classes.customSelect}>{t('forfaitingApplication.financialImplementation')}</InputLabel>
                                <Select
                                    native
                                    className={classes.customSelect}
                                    value={forfaitingData.finance}
                                    onChange={e => setForfaitingData({ ...forfaitingData, finance: e.target.value })}
                                >
                                    <option value="" />
                                    {financeEnums.map((item, i) => (
                                        <option
                                            key={i}
                                            value={item}
                                        >
                                            {item}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid
                            item
                            xs={6}
                        >
                            <Typography
                                className={classes.inputTitle}
                            >
                                {t('forfaitingApplication.bankConfirmation')}
                            </Typography>
                            <UploadDocument
                                documents={forfaitingData.bankConfirmation}
                                onDelete={newDocs => setForfaitingData(prevState => (
                                    { ...prevState, bankConfirmation: newDocs }
                                ))}
                                onChange={doc => setForfaitingData(prevState => (
                                    { ...prevState, bankConfirmation: [...prevState.bankConfirmation, doc] }
                                ))}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={6}
                        >
                            <Typography
                                className={classes.inputTitle}
                            >
                                {t('forfaitingApplication.financialStatements')}
                            </Typography>
                            <UploadDocument
                                documents={forfaitingData.financialStatements}
                                onChange={doc => setForfaitingData(prevState => (
                                    { ...prevState, financialStatements: [...prevState.financialStatements, doc] }
                                ))}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <Typography
                                className={classes.listOfDocumentsLabel}
                            >
                                {t('forfaitingApplication.listOfRelevantDocuments')}
                            </Typography>
                            <ForfaitingDocuments
                                label={t('forfaitingApplication.energyAudit')}
                                missingLabel={t('forfaitingApplication.missingEnergyAudit')}
                                files={energyAudit}
                                projectId={project._id}
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
                                files={renovationPlan}
                                projectId={project._id}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            className={classes.item}
                        >
                            <ForfaitingDocuments
                                label={t('forfaitingApplication.preEPC')}
                                missingLabel={t('forfaitingApplication.missinPreEPC')}
                                files={preEPC}
                                projectId={project._id}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleCompleteForm}
                        disabled={canFinish(forfaitingData, requiredFields) && requiredFilesPresent()}
                    >
                        {t('utils.apply')}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

ForfaitingForm.defaultProps = {
    disabled: false,
    isOpen: false,
};

function UploadDocument(props) {
    const classes = useStyles();
    const { t } = useTranslation('translations');
    const {
        addAlert,
        onChange,
        onDelete,
        documents
    } = props;

    const handleDelete = (docToDelete) => () => {
        const newDocs = documents.filter((d) => d.name !== docToDelete.name);
        onDelete(newDocs);
    };

    return (
        <React.Fragment>
            <Dropzone
                onDrop={(acceptedFiles, rejectedFiles) => {
                    if (rejectedFiles.length > 0) {
                        addAlert('Unsupported file type.', 'error');
                    }
                    acceptedFiles.map(doc => onChange(doc));
                }}
                accept={allowedMimeTypes}
            >
                {({ getRootProps, getInputProps }) => {
                    return (
                        <div {...getRootProps()} tabIndex="none" className={classes.uploadContainer}>
                            <input {...getInputProps()} />
                            <Button
                                variant="text"
                                color="primary"
                                className={classes.uploadButton}
                                startIcon={<UploadIcon />}
                                disableRipple
                            >
                                {t('documents.uploadDocument')}
                            </Button>
                        </div>
                    );
                }}
            </Dropzone>
            <ul className={classes.documentsList}>
                {documents.map((doc, i) => {
                    return (
                        <TooltipWrapper key={i} title={doc.name}>
                            <li>
                                <Chip
                                    label={doc.name}
                                    onDelete={handleDelete(doc)}
                                    className={classes.chip}
                                />
                            </li>
                        </TooltipWrapper>

                    );
                })}
            </ul>
        </React.Fragment>
    );
}

export default withRouter(connect(
    state => ({
        project: state.project.refetchProject
    }),
    dispatch => ({
        uploadDocument: (file, entity, onSuccess) => dispatch(
            uploadFile(file, entity, { onSuccess, withoutAlert: true })
        ),
        refetchProject: (projectId) => dispatch(refetchSingleProject(projectId)),
    })
)(ForfaitingForm));
