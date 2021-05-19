import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Dropzone from 'react-dropzone';
import {
  Avatar,
  Grid,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  Gavel as LegalFormIcon,
  CloudUpload as UploadIcon,
  InsertDriveFile as FileIcon
} from '@material-ui/icons';

import { allowedMimeTypes } from '../../../utils/mimeTypes';
import { isResidentsCommunity } from '../../../constants/legalStatusTypes';
import IconWidget from '../../../containers/smartcomponents/IconWidget/IconWidget';
import { validate } from '../../../utils/validation';
import Input from '../../utils/Input';
import { vlalidationRules } from '../OrganizationEditor/utils';
import { shouldInvalidateOrg } from '../../../utils/can';
import styles from './styles';

const useStyles = makeStyles(styles);

function OrganizationDetailsForm(props) {
  const {
    legal_form,
    registered,
    website,
    telephone,
    vat,
    email,
    logoURL,
    registration_number,
    handleSetData,
    handleSetFieldErrors,
    fieldErrors,
    organization,
    address,
    name, // eslint-disable-line no-shadow
    files,
    user,
  } = props;

  const { t } = useTranslation('translations');
  const classes = useStyles();

  const handleValidate = (fieldKey, value) => {
    const res = validate(value, [vlalidationRules[fieldKey]]);
    if (!res.valid) {
      handleSetFieldErrors({ [fieldKey]: res.errors });
      return;
    }
    if (fieldKey in props.fieldErrors) {
      handleSetFieldErrors({ [fieldKey]: null });
    }
  };

  const shouldRenderLegalFields = !isResidentsCommunity(legal_form);

  return (
    <IconWidget
      className={classes.formWidget}
      icon={<LegalFormIcon color="primary" />}
      title={
        <Typography variant="subtitle1">
          {t('organizations.information')}
        </Typography>
      }
    >
      <Grid
        container
        spacing={3}
      >
        {shouldRenderLegalFields && (
          <Grid item xs={12} sm={6}>
            <Input
              label={t('organizations.registrationDateLegal')}
              type="date"
              required
              value={registered}
              onChange={e => handleSetData({ registered: e.target.value })}
              fullWidth
            />
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <ListItem component="div" ContainerComponent="div" className={classes.logoUpload}>
            <ListItemAvatar>
              <Avatar variant="square" src={logoURL}>
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={t('organizations.logo')}
            />
            <ListItemSecondaryAction>
              <FileUpload
                onDropAcceted={fs => handleSetData({
                  logoUpload: fs[0],
                  logoURL: URL.createObjectURL(fs[0]),
                })}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </Grid>
        {shouldRenderLegalFields && (
          <React.Fragment>
            <Grid item xs={12} sm={6}>
              <Input
                label={t('organizations.registrationNumber')}
                required
                value={registration_number}
                onChange={e => handleSetData({ registration_number: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.websiteGridWrapper}>
              <Input
                label={t('organizations.website')}
                required
                value={website.replace(/^http:\/\//, '')}
                errors={fieldErrors.website}
                onChange={e => handleSetData({ website: e.target.value })}
                onBlur={e => handleValidate('website', e.target.value)}
                startAdornment="http://"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                label={t('organizations.phonePlaceholder')}
                value={telephone}
                onChange={e => handleSetData({ telephone: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                label={t('organizations.vatNumber')}
                required
                value={vat}
                onChange={e => handleSetData({ vat: e.target.value })}
                fullWidth
              />
            </Grid>
          </React.Fragment>

        )}
        <Grid item xs={12} sm={6}>
          <Input
            label={t('organizations.email')}
            required
            value={email}
            errors={fieldErrors.email}
            onChange={e => handleSetData({ email: e.target.value })}
            onBlur={e => handleValidate('email', e.target.value)}
            fullWidth
          />
        </Grid>
        <VerificationUploads
          organization={organization}
          name={name}
          vat={vat}
          address={address}
          registration_number={registration_number}
          legal_form={legal_form}
          files={files}
          user={user}
          handleSetData={handleSetData}
        />
      </Grid>
    </IconWidget>
  );
}

function FileUpload(props) {
  const {
    onDropAcceted,
    className,
  } = props;

  return (
    <Dropzone
      accept={allowedMimeTypes}
      onDrop={(acceptedFiles) => onDropAcceted(acceptedFiles)}
    >
      {({ getRootProps, getInputProps }) => {
        return (
          <div {...getRootProps()} tabIndex="none" className={className}>
            <input {...getInputProps()} />
            <IconButton>
              <UploadIcon />
            </IconButton>
          </div>
        );
      }}
    </Dropzone>
  );
}

function VerificationUploads(props) {
  const {
    organization,
    name, // eslint-disable-line no-shadow
    vat,
    address,
    registration_number,
    legal_form,
    files,
    user,
    handleSetData,
  } = props;

  const { t } = useTranslation('translations');
  const classes = useStyles();

  if (!shouldInvalidateOrg(organization, { orgName: name, vat, address, registration_number, legal_form }, user)) {
    return null;
  }

  return (
    <React.Fragment>
      <Grid item xs={12} sm={6}>
        <ListItem component="div" ContainerComponent="div" className={classes.logoUpload}>
          <ListItemAvatar>
            <Avatar variant="square">
              <FileIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              files.length > 0 ?
                files.map(f => f.name + '; ') :
                t('navigation.documents')
            }
          />
          <ListItemSecondaryAction>
            <FileUpload
              onDropAcceted={fs => handleSetData({
                files: fs
              })}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </Grid>
      <Grid item xs={12}>
        <Typography align="center" color="error" variant="h6">
          {t('organizations.changedFields')}
        </Typography>
      </Grid>
    </React.Fragment>
  );
}

export default connect(
  state => ({
    organization: state.organization.publicOrgData,
    user: state.user
  })
)(OrganizationDetailsForm);
