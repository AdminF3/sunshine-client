import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Dropzone from 'react-dropzone';

import {
    Grid,
    Avatar,
    Typography,
    Divider,
    IconButton,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Collapse,
    Menu,
    MenuItem,
    Table,
    TableBody,
    TableRow,
    TableCell,
    makeStyles,
} from '@material-ui/core';

import {
    ExpandMore,
    ExpandLess,
    EditAttributes as EditAttributesIcon,
    Create as EditIcon,
    Cancel as DeclineIcon,
    CloudUpload as UploadIcon,
    CheckCircle as VerifyIcon,
    Assignment as DocumentIcon,
    DeleteForever as DeleteIcon,
} from '@material-ui/icons';

import EntitiesList from '../../utils/EntitiesList';
import { allowedMimeTypes } from '../../../utils/mimeTypes';
import UserRoleBadge from '../../utils/UserRoleBadge';
import TooltipWrapper from '../../utils/TooltipWrapper';
import { SERVER } from '../../../constants/endpoints';
import { countriesLabels as countries } from '../../../constants/countries';
import {
    retrieveProjectRoles as getProjectRoles,
    hasCountryRole,
    getEveryRoleEveryCountry
} from '../../../utils/userRoles';
import {
    deleteFile as deleteFileAction,
    uploadFile as uploadFileAction
} from '../../../actions/uploads';

import LEARApplyButton from './LEARApplyButton';
import styles from './styles';

const useStyles = makeStyles(styles);

function UserProfile(props) {
    const classes = useStyles();
    const { t } = useTranslation('translations');
    const {
        userData,
        myOrganizations,
        myProjects,
        myAssets,
        updateUser,
        refetch,
        uploadFile,
        deleteFile,
        loggedUser,
        theirProjects,
        theirOrganizations,
        isPrivate,
    } = props;

    const [edit, setEdit] = useState(false);
    const [updatedData, setUpdatedData] = useState({
        id: userData?._id,
        name: userData?.data?.name,
        country: userData?.data?.country,
        telephone: userData?.data?.telephone,
        avatar: userData?.data?.avatar
    });

    if (!userData?._id) {
        return null;
    }

    function handleUpdateUser() {
        updateUser(updatedData);
        setEdit(false);
    }

    function handleVerify(value) {
        updateUser({
            ...updatedData,
            valid: value ? 2 : 1
        });
    }

    const isCountryAdmin = hasCountryRole(loggedUser, { role: 'country_admin' });
    const canReview = isCountryAdmin || loggedUser.superuser;

    function filterMyProjectsWithRole() {
        if (isPrivate) {
            return myProjects.filter(proj => getProjectRoles(userData._id, proj).filter(r => r === 'unsigned').length === 0);
        }
        return theirProjects.filter(proj => getProjectRoles(userData._id, proj).filter(r => r === 'unsigned').length === 0);
    }

    return (
        <Grid
            className={classes.container}
            container
            spacing={5}
        >
            <Grid
                lg={4}
                xs={12}
                item
            >
                {
                    edit ?
                        <UserInformationForm
                            setEdit={setEdit}
                            user={userData.data}
                            updatedData={updatedData}
                            setUpdatedData={setUpdatedData}
                            handleUpdateUser={handleUpdateUser}
                        /> :
                        <UserInformation
                            user={userData.data}
                            setEdit={setEdit}
                        />
                }
            </Grid>
            <Grid
                lg={8}
                xs={12}
                item
            >
                <PlatformStatus
                    userData={userData}
                    myOrganizations={myOrganizations}
                    deleteFile={deleteFile}
                    refetch={refetch}
                    handleVerify={handleVerify}
                    uploadFile={uploadFile}
                    canReview={canReview}
                />

                {/* List of organizations */}
                <EntitiesList
                    userId={userData._id}
                    entities={isPrivate ? myOrganizations : theirOrganizations}
                    label={t('organizations.myOrganizationsAndRoles')}
                    tooltip="tooltips:organizations.roles"
                    type="organization"
                    disablePadding
                    zeroEntriesMessage={
                        `${t('notifications.youAreNotPart')} ${t('navigation.organizations').toLowerCase()}`
                    }
                />

                {/* List of projects */}
                <EntitiesList
                    userId={userData._id}
                    entities={filterMyProjectsWithRole()}
                    label={t('projects.myProjectsAndRoles')}
                    tooltip="tooltips:projects.roles"
                    type="project"
                    disablePadding
                    zeroEntriesMessage={
                        `${t('notifications.youAreNotPart')} ${t('navigation.projects').toLowerCase()}`
                    }
                />

                {/* List of assets */}
                <EntitiesList
                    userId={userData._id}
                    entities={myAssets}
                    label={t('assets.myAssets')}
                    type="asset"
                    disablePadding
                    zeroEntriesMessage={
                        `${t('notifications.youAreNotPart')} ${t('navigation.assets').toLowerCase()}`
                    }
                />
            </Grid>
        </Grid>
    );
}

function UserInformation(props) {
    const classes = useStyles();
    const { t } = useTranslation('translations');
    const { user, setEdit } = props;
    return (
        <Grid
            className={classes.userInformationContainer}
        >
            <Grid
                item
                xs={12}
                className={classes.avatarContainer}
            >
                <Grid
                    item
                    className={classes.roleBadge}
                >
                    <UserRoleBadge
                        user={user}
                    />
                </Grid>
                <IconButton
                    className={classes.editButton}
                    onClick={() => setEdit(true)}
                >
                    <EditIcon />
                </IconButton>
                <Avatar
                    alt={user.name}
                    src={SERVER + user.avatar}
                    className={classes.avatar}
                />
            </Grid>
            <Divider
                className={classes.profileDivider}
            />
            <Grid
                item
                xs={12}
            >
                <Label
                    label={t('auth.fullName')}
                    text={user.name}
                />
            </Grid>
            <Grid
                item
                xs={12}
            >
                <Label
                    label={t('auth.country')}
                    text={user.country}
                />
            </Grid>
            <Grid
                item
                xs={12}
            >
                <Label
                    label={t('profile.phoneNumber')}
                    text={user.telephone || 'n/a'}
                />
            </Grid>
            <Grid
                item
                xs={12}
            >
                <Label
                    label={t('auth.email')}
                    text={user.email}
                />
            </Grid>
        </Grid>
    );
}

function UserInformationForm(props) {
    const classes = useStyles();
    const { t } = useTranslation('translations');
    const {
        user,
        setEdit,
        setUpdatedData,
        updatedData,
        handleUpdateUser,
    } = props;

    return (
        <Grid
            className={classes.userInformationContainer}
        >
            <Grid
                item
                xs={12}
                className={classes.avatarContainer}
            >
                <Grid
                    item
                    className={classes.roleBadge}
                >
                    <UserRoleBadge
                        user={user}
                    />
                </Grid>
                <IconButton
                    className={classes.editButton}
                    onClick={() => setEdit(false)}
                >
                    <EditIcon />
                </IconButton>
                <ChangeAvatar
                    user={user}
                    updatedData={updatedData}
                    avatar={updatedData.avatar}
                    setAvatar={setUpdatedData}
                />
            </Grid>
            <Divider
                className={classes.profileDivider}
            />
            <TextFieldWrapper
                label={t('auth.reqFullName')}
                defaultValue={user.name}
                onChange={setUpdatedData}
                field="name"
            />
            <Grid
                item
                xs={12}
                className={classes.textFieldItem}
            >
                <TextField
                    select
                    className={classes.labelContainer}
                    label={t('auth.reqFullName')}
                    value={updatedData.country}
                    onChange={e => {
                        setUpdatedData(prevState => (
                            { ...prevState, country: e.target.value }));
                    }
                    }
                >
                    {countries.map((option, i) => (
                        <MenuItem key={i} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <TextFieldWrapper
                label={t('profile.phoneNumber')}
                defaultValue={user.telephone}
                onChange={setUpdatedData}
                field="telephone"
            />
            <Grid
                container
                className={classes.buttonsFooter}
            >
                <Button
                    variant="outlined"
                    color="primary"
                    className={classes.closeButton}
                    onClick={() => setEdit(false)}
                >
                    {t('utils.confirmDialogCancel')}
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    className={classes.saveButton}
                    onClick={handleUpdateUser}
                >
                    {t('profile.profileUpdate')}
                </Button>
            </Grid>
        </Grid>
    );
}

function Label(props) {
    const classes = useStyles();
    const { label, text } = props;

    return (
        <div className={classes.labelContainer}>
            <Typography className={classes.label}>
                {label}
            </Typography>
            <Typography className={classes.text}>
                {text}
            </Typography>
        </div>
    );
}

function TextFieldWrapper(props) {
    const classes = useStyles();
    const {
        label,
        defaultValue,
        onChange,
        field,
        select
    } = props;

    return (
        <Grid
            item
            xs={12}
            className={classes.textFieldItem}
        >
            <TextField
                defaultValue={defaultValue}
                label={label}
                className={classes.labelContainer}
                select={select}
                onChange={e => {
                    e.persist();
                    onChange(prevState => (
                        { ...prevState, [field]: e.target.value }));
                }
                }
            />
        </Grid>
    );
}

function PlatformStatus(props) {
    const classes = useStyles();
    const { t } = useTranslation('translations');
    const {
        userData,
        deleteFile,
        refetch,
        handleVerify,
        uploadFile,
        canReview
    } = props;
    const [openList, setOpenList] = useState(false);

    const handleClick = () => {
        setOpenList(!openList);
    };

    return (
        <Grid
            className={classes.verificationContainer}
        >
            <Grid
                container
                className={classes.statusHeader}
            >
                <Grid
                    item
                >
                    <Typography
                        className={classes.platformStatusLabel}
                    >
                        {t('auth.platformStatus')}
                    </Typography>
                </Grid>
                <Grid
                    item
                    className={classes.platformActions}
                >
                    <LEARApplyButton />
                    {
                        userData.data.valid !== 2 &&
                        <UploadDocument
                            uploadFile={uploadFile}
                            user={userData.data}
                            refetch={refetch}
                        />
                    }
                    {
                        canReview &&
                        <ReviewMenu
                            handleVerify={handleVerify}
                        />
                    }
                </Grid>
            </Grid>
            <Divider className={classes.statusDivider} />
            <Grid
                container
            >
                <Grid
                    item
                    className={classes.filesContainer}
                >
                    <List
                        className={classes.documentsList}
                    >
                        {userData.data.country_roles.length > 0 &&
                            <ListItem>
                                <Table>
                                    <TableBody>
                                        {Object.entries(getEveryRoleEveryCountry(userData)).map((country, index) => (
                                            <TableRow
                                                key={index}
                                                className={classes.link}
                                            >
                                                <TableCell>
                                                    {country[0]}
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                >
                                                    {country[1].map((r, i) => <Typography key={i} className={classes.role}>{t(`platformRoles.${r}`)}</Typography>)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </ListItem>
                        }
                        <ListItem
                            button
                            onClick={handleClick}
                        >
                            <ListItemText
                                primary={t('auth.listDocuments')}
                            />
                            {openList ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse
                            in={openList}
                            timeout="auto"
                            unmountOnExit
                        >
                            {
                                userData._attachments && Object.values(userData._attachments)
                                    .map((file, index) => (
                                        <Grid
                                            key={index}
                                            component={ListItem}
                                            container
                                        >
                                            <TooltipWrapper
                                                title={t('documents.document')}
                                            >
                                                <ListItemIcon>
                                                    <DocumentIcon />
                                                </ListItemIcon>
                                            </TooltipWrapper>
                                            <TooltipWrapper
                                                title={t('auth.uploadDate')}
                                            >
                                                <Grid
                                                    component={ListItemText}
                                                    item
                                                    xs={4}
                                                >
                                                    {new Date(file.CreatedAt).toUTCString()}
                                                </Grid>
                                            </TooltipWrapper>
                                            <TooltipWrapper
                                                title={t('auth.previewDocument')}
                                            >
                                                <Grid
                                                    component="a"
                                                    item
                                                    xs={4}
                                                    className={classes.documentName}
                                                    href={`${SERVER}/user/${userData.data.ID}/${file.name}`}
                                                    target="_blank"
                                                >
                                                    {file.name}
                                                </Grid>
                                            </TooltipWrapper>
                                            <TooltipWrapper
                                                title={t('auth.deleteDocument')}
                                            >
                                                <ListItemIcon
                                                    className={classes.deleteIconContainer}
                                                >
                                                    <DeleteIcon
                                                        className={classes.deleteIcon}
                                                        onClick={() => deleteFile(
                                                            file.name,
                                                            { id: userData._id, type: 'user' },
                                                            () => refetch(userData._id)
                                                        )}
                                                    />
                                                </ListItemIcon>
                                            </TooltipWrapper>
                                        </Grid>
                                    ))
                            }
                        </Collapse>
                    </List>
                </Grid>
            </Grid>
        </Grid>
    );
}

function ReviewMenu(props) {
    const { handleVerify } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();
    const { t } = useTranslation('translations');

    const handleClick = e => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <TooltipWrapper
                title={t('auth.review')}
            >
                <IconButton
                    onClick={handleClick}
                >
                    <EditAttributesIcon />
                </IconButton>
            </TooltipWrapper>
            <Menu
                disableScrollLock={true}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem
                    onClick={() => {
                        handleVerify(true);
                        handleClose();
                    }}
                >
                    <ListItemIcon>
                        <VerifyIcon
                            fontSize="small"
                            className={classes.verifyIcon}
                        />
                    </ListItemIcon>
                    <ListItemText
                        primary={t('adminActions.verify')}
                    />
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleVerify(false);
                        handleClose();
                    }}
                >
                    <ListItemIcon>
                        <DeclineIcon
                            fontSize="small"
                            className={classes.declineIcon}
                        />
                    </ListItemIcon>
                    <ListItemText
                        primary={t('adminActions.decline')}
                    />
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}

function ChangeAvatar(props) {
    const classes = useStyles();
    const { t } = useTranslation('translations');
    const {
        user,
        avatar,
        setAvatar,
        addAlert,
        updatedData
    } = props;

    return (
        <Dropzone
            accept="image/jpeg, image/png"
            onDrop={(acceptedFiles, rejectedFiles) => {
                if (rejectedFiles[0]) {
                    addAlert('Unsupported file type. Supported types: .jpeg, .png', 'error');
                }
                setAvatar({
                    ...updatedData,
                    avatar: acceptedFiles[0]
                });
            }}
        >
            {({ getRootProps, getInputProps }) => {
                return (
                    <div {...getRootProps()} className={classes.avatar} tabIndex="none">
                        <input {...getInputProps()} />
                        <Avatar
                            className={classes.avatar}
                            alt={user.name}
                            style={{
                                backgroundPosition: 'center',
                                backgroundImage: avatar instanceof File ? `url(${URL.createObjectURL(avatar)})` : `url(${SERVER + user.avatar})`
                            }}
                        >
                            {t('auth.changeAvatar')}
                        </Avatar>
                    </div>
                );
            }}
        </Dropzone>
    );
}

function UploadDocument(props) {
    const classes = useStyles();
    const { t } = useTranslation('translations');
    const {
        addAlert,
        uploadFile,
        user,
        refetch
    } = props;

    return (
        <Dropzone
            accept={allowedMimeTypes}
            onDrop={(acceptedFiles, rejectedFiles) => {
                if (rejectedFiles[0]) {
                    addAlert('Unsupported file type. Supported types: .jpeg, .png, .pdf', 'error');
                }
                uploadFile(
                    acceptedFiles[0],
                    {
                        id: user.ID,
                        type: 'user',
                        kind: 'identity'
                    },
                    () => refetch(user.ID)
                );
            }}
        >
            {({ getRootProps, getInputProps }) => {
                return (
                    <div {...getRootProps()} tabIndex="none" className={classes.uploadContainer}>
                        <input {...getInputProps()} />
                        <TooltipWrapper title={t('auth.uploadAnId')}>
                            <Button
                                variant="text"
                                color="primary"
                                className={classes.uploadButton}
                                startIcon={<UploadIcon />}
                                disableRipple
                            >
                                {t('documents.uploadDocument')}
                            </Button>
                        </TooltipWrapper>
                    </div>
                );
            }}
        </Dropzone>
    );
}

export default connect(
    state => ({
        myOrganizations: state.organization.myOrganizations,
        myProjects: state.project.myProjects,
        myAssets: state.asset.myAssets,
        theirProjects: state.project.theirProjects,
        theirOrganizations: state.organization.theirOrganizations,
        loggedUser: state.user.profileInfo.data,
    }),
    dispatch => ({
        deleteFile: (fileName, entity, onSuccess) => dispatch(deleteFileAction(fileName, entity, { onSuccess })),
        uploadFile: (file, entity, onSuccess) => dispatch(uploadFileAction(file, entity, { onSuccess })),
    })
)(UserProfile);
