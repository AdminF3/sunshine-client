import React from 'react';
import { useTranslation } from 'react-i18next';
import Dropzone from 'react-dropzone';
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  CheckCircleOutline as CheckIcon,
  HighlightOff as CancelIcon,
  Gavel as LegalFormIcon,
  CloudUpload as UploadIcon,
} from '@material-ui/icons';

import { allowedMimeTypes } from '../../../utils/mimeTypes';
import IconWidget from '../../../containers/smartcomponents/IconWidget/IconWidget';
import { legalForms, isResidentsCommunity } from '../../../constants/legalStatusTypes';
import Input from '../../utils/Input';
import { legalFormsRequiredFiles } from '../OrganizationEditor/utils';
import styles from './styles';

const useStyles = makeStyles(styles);

function OrganizationLegalForm(props) {
  const {
    ID,
    legal_form,
    files,
    learApplyDoc,
    handleSetData,
  } = props;

  const { t } = useTranslation('translations');
  const classes = useStyles();

  const lf = legalForms(t, true).slice();
  // Remove the ALL option from options enum and filter
  // Residents community option if we are in EDIT mode.
  const options = ID ? lf.filter(o => ['ALL', 'RESIDENTS_COMMUNITY'].indexOf(o.enum) < 0) : lf;

  const onChange = (e) => {
    // null address values if registering, but changing
    // from residents community to other legal form.
    if (!ID && isResidentsCommunity(legal_form)) {
      handleSetData({
        legal_form: e.target.value,
        name: '',
        address: '',
        country: '',
      });
      return;
    }
    handleSetData({
      legal_form: e.target.value,
    });
  };

  return (
    <IconWidget
      className={classes.formWidget}
      icon={<LegalFormIcon color="primary" />}
      title={
        <Typography variant="subtitle1">
          {t('organizations.legalForm')}
        </Typography>
      }
    >
      <Grid
        container
        spacing={3}
      >
        <Grid item xs={12}>
          <Input
            label={t('organizations.legalForm')}
            required
            value={legal_form}
            options={options}
            onChange={onChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          {!ID &&
            <React.Fragment>
              <RequiredDocuments
                legal_form={legal_form}
                files={files}
                onFileAdded={f => {
                  handleSetData({
                    files: { ...files, ...f },
                  });
                }}
                title={`
                  ${t('organizations.requiredDocsTitle')} 
                  ${isResidentsCommunity(legal_form) ? t('organizations.requiredDocsRCTitle') : ''}
                `}
                list={legalFormsRequiredFiles[legal_form] || legalFormsRequiredFiles.OTHER}
              />
              {legal_form && (
                <RequiredDocuments
                  legal_form={legal_form}
                  files={learApplyDoc}
                  onFileAdded={f => {
                    handleSetData({
                      learApplyDoc: f,
                    });
                  }}
                  title={t('organizations.learApplyTitle')}
                  list={legalFormsRequiredFiles.LEAR}
                />
              )}
            </React.Fragment>
          }
        </Grid>
      </Grid>
    </IconWidget>
  );
}

function RequiredDocuments(props) {
  const {
    legal_form,
    files,
    onFileAdded,
    title,
    list
  } = props;

  const { t } = useTranslation('translations');

  if (!legal_form) {
    return null;
  }

  return (
    <React.Fragment>
      <Typography variant="subtitle2">
        {title}
      </Typography>
      <List>
        {list.map((labelKey, i) => {
          return (
            <ListItem key={labelKey}>
              <ListItemIcon>
                {files[i] ? <CheckIcon color="primary" /> : <CancelIcon color="disabled" />}
              </ListItemIcon>
              <ListItemText
                primary={t(labelKey)}
                secondary={files[i] && files[i].name}
              />
              <ListItemSecondaryAction>
                <Dropzone
                  onDrop={(acceptedFiles) => onFileAdded({ [i]: acceptedFiles[0] })}
                  accept={allowedMimeTypes}
                >
                  {({ getRootProps, getInputProps }) => {
                    return (
                      <div {...getRootProps()} tabIndex="none">
                        <input {...getInputProps()} />
                        <Button
                          color="primary"
                          startIcon={<UploadIcon />}
                        >
                          {t('notifications.upload')}
                        </Button>
                      </div>
                    );
                  }}
                </Dropzone>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </React.Fragment>
  );
}

export default OrganizationLegalForm;
