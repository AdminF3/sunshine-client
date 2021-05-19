import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  Info as InfoIcon,
  InfoOutlined as InfoOutlinedIcon,
} from '@material-ui/icons';

import IconWidget from '../../../containers/smartcomponents/IconWidget/IconWidget';
import Input from '../../utils/Input';
import { heatingTypesMap } from '../../../constants/assetTypes';
import { isResidentsCommunity } from '../../../constants/legalStatusTypes';
import styles from './styles';
import UserTooltip from '../../utils/UserTooltip';

const useStyles = makeStyles(styles);

const fieldsGrid = [
  [
    { label: 'assets.cadastreNumber', key: 'cadastre', type: 'text', placeholder: '9832625', required: true, tooltip: 'tooltips:assets.assetFields.cadastre' }, // eslint-disable-line max-len
    { label: 'assets.ownerOfAsset', key: 'owner', required: true, options: 'myOrganizations', tooltip: 'tooltips:assets.assetFields.owner' }, // eslint-disable-line max-len
  ],
  [
    { label: 'assets.regTotalArea', key: 'area', placeholder: '0000.00', required: true, endAdornment: '㎡', tooltip: 'tooltips:assets.assetFields.totalArea' }, // eslint-disable-line max-len
    { label: 'assets.commonPartsArea', key: 'common_parts_area', placeholder: '0000.00', endAdornment: '㎡' },
    { label: 'assets.billingArea', key: 'billing_area', placeholder: '0000.00', endAdornment: '㎡', tooltip: 'tooltips:assets.assetFields.billingArea' }, // eslint-disable-line max-len
    { label: 'assets.heatedArea', key: 'heated_area', placeholder: '0000.00', endAdornment: '㎡', tooltip: 'tooltips:assets.assetFields.heatedArea' }, // eslint-disable-line max-len
  ],
  [
    { label: 'assets.numberOfFlats', key: 'flats', placeholder: '000' },
    { label: 'assets.numberOfFloors', key: 'floors', placeholder: '000' },
    { label: 'assets.numberOfStaircases', key: 'stair_cases', required: true, placeholder: '000' },
  ],
];

function AssetInformationForm(props) {
  const { handleSetData } = props;

  const { t } = useTranslation('translations');
  const classes = useStyles();

  return (
    <IconWidget
      className={classes.formWidget}
      icon={<InfoIcon color="primary" />}
      title={
        <Typography variant="subtitle1">
          {t('assets.information')}
        </Typography>
      }
    >
      <Grid
        container
        direction="column"
        spacing={2}
      >
        {fieldsGrid.map((row, i) => (
          <Grid item xs={12} key={i}>
            <Grid container direction="row" spacing={2}>
              {row.map((f) => {
                let options = null;
                if (f.options && Array.isArray(props[f.options])) {
                  options = props[f.options].map(o => ({ value: o._id, label: o.data.name }));
                }

                return (
                  <Grid item key={f.key} align="stretch" sm={12 / row.length} xs={12}>
                    <Input
                      type={f.type || 'number'}
                      options={options}
                      value={props[f.key] || ''}
                      label={t(f.label)}
                      placeholder={f.placeholder}
                      required={Boolean(f.required)}
                      endAdornment={f.endAdornment || null}
                      tooltip={f.tooltip && t(f.tooltip)}
                      onChange={e => handleSetData({ [f.key]: f.search ? e.value : e.target.value })}
                      search={f.search}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12}>
          <FormControl
            required
            component="fieldset"
            className={classes.formControl}
            fullWidth
          >
            <FormLabel component="legend">
              {t('assets.typeOfHeating')}
            </FormLabel>
            <RadioGroup
              value={String(props.heating_type)}
              onChange={(e => handleSetData({ heating_type: e.target.value }))}
            >
              {heatingTypesMap.map(({ id, title, tooltip }) => (
                <FormControlLabel
                  key={id}
                  value={id}
                  control={<Radio />}
                  className={classes.radioLabel}
                  label={
                    <React.Fragment>
                      {t(title)}
                      {tooltip && (
                        <UserTooltip
                          title={t(tooltip)}
                          icon={<InfoOutlinedIcon />}
                          placement="top-start"
                        />
                      )}
                    </React.Fragment>
                  }
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </IconWidget>
  );
}

AssetInformationForm.propTypes = {
  handleSetData: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    myOrganizations: state.organization.myOrganizations.filter(o => !isResidentsCommunity(o.data.legal_form)),
    residentsCommunities: state.organization.allOrganizations.filter(o => isResidentsCommunity(o.data.legal_form)),
  }),
)(AssetInformationForm);
