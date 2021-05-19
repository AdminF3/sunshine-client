import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Chip,
  Typography,
  TextField,
  makeStyles,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  Business as BusinessIcon,
  Warning as WarningIcon,
} from '@material-ui/icons';

import { isResidentsCommunity } from '../../../constants/legalStatusTypes';
import IconWidget from '../../../containers/smartcomponents/IconWidget/IconWidget';
import OutlinedSelect from '../../utils/OutlinedSelect';
import TextWithIcon from '../../utils/TextWithIcon';
import { getAllOrganizations } from '../../../actions/organizations';

const useStyles = makeStyles(theme => ({
  consortiumOrgsForm: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(1),
  },
  chips: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),

    '& > .MuiChip-root': {
      margin: `0 ${theme.spacing(0.5)}px`,

      '&:first-child': {
        margin: 0,
      },
    }
  },
  addConsortiumOrgButton: {
    marginTop: theme.spacing(2),
    alignSelf: 'flex-end',
  },

}));

function OwnerForm(props) {
  const {
    myOrganizations,
    organizations,
    ownerUUID,
    handleSetData,
    getOrganizations
  } = props;

  useEffect(() => {
    getOrganizations();
  }, [getOrganizations]);

  const [consortiumOrg, setConsortiumOrg] = useState(null);

  const { t } = useTranslation('translations');
  const classes = useStyles();

  return (
    <IconWidget
      icon={<BusinessIcon color="primary" />}
      title={
        <Typography variant="subtitle1">
          {t('projects.ownerInformation')}
        </Typography>
      }
    >
      {myOrganizations.length > 0 && (
        <OutlinedSelect
          label={t('projects.owner')}
          value={ownerUUID}
          options={myOrganizations.map(o => ({ value: o._id, label: o.data.name }))}
          helperText={t('projects.ownerSelectExplantion')}
          onChange={(e) => handleSetData({ ownerUUID: e.target.value })}
        />
      )}
      {myOrganizations.length === 0 && (
        <TextWithIcon
          icon={<WarningIcon color="error" />}
          variant="h5"
          gutterBottom
        >
          {t('projects.noActiveOrganizations')}
        </TextWithIcon>
      )}
      <div className={classes.consortiumOrgsForm}>
        <Typography gutterBottom>
        {t('projects.consortiumOrganizations')}
        </Typography>
        <div className={classes.chips}>
          {props.consortium_organizations.length === 0 && (
            <Typography
              variant="caption"
              component="p"
              gutterBottom
            >
              {t('projects.noConsortiumOrganizations')}
            </Typography>
          )}
          {props.consortium_organizations.map((co) => (
            <Chip
              key={co.value}
              label={co.label}
              onDelete={() => handleSetData({
                consortium_organizations: props.consortium_organizations.filter(({ value }) => co.value !== value),
              })}
              color="primary"
            />
          ))}
        </div>
        <Autocomplete
          options={organizations.map(o => ({ value: o._id, label: o.data.name }))}
          getOptionLabel={(option) => option.label}
          getOptionSelected={(option, v) => option.value === v.value}
          renderInput={(params) =>
            <TextField
              {...params}
              label={t('navigation.organizations')}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          }
          onChange={(_, v) => setConsortiumOrg(v)}
          disableClearable
        />
        <Button
          color="primary"
          variant="outlined"
          disabled={!consortiumOrg}
          className={classes.addConsortiumOrgButton}
          onClick={() => handleSetData({
            consortium_organizations: [...props.consortium_organizations.filter(v => consortiumOrg.value !== v.value), consortiumOrg], // eslint-disable-line max-len
          })}
        >
          {t('projects.addConsortiumOrganization')}
        </Button>
      </div>
    </IconWidget>
  );
}

OwnerForm.propTypes = {
  myOrganizations: PropTypes.array.isRequired,
  organizations: PropTypes.array.isRequired,
  ownerUUID: PropTypes.string.isRequired,
  handleSetData: PropTypes.func.isRequired,
};

OwnerForm.defaultProps = {
  myOrganizations: [],
  organizations: [],
};

export default connect(
  state => ({
    myOrganizations: state.organization.myOrganizations.filter(o => !isResidentsCommunity(o.data.legal_form)),
    organizations: state.organization.allOrganizations.filter(o => !isResidentsCommunity(o.data.legal_form)),
  }),
  dispatch => ({
    getOrganizations: () => dispatch(getAllOrganizations(0, 1000))
  })
)(OwnerForm);
