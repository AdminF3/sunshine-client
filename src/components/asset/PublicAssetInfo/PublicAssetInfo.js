import React from 'react';
import { connect } from 'react-redux';

import { useTranslation } from 'react-i18next';
import {
  Divider,
  makeStyles,
} from '@material-ui/core';
import {
  InfoOutlined as InfoIcon,
} from '@material-ui/icons';

import { assetTypeTitleKey } from './../../../constants/assetTypes';

import UserTooltip from '../../utils/UserTooltip';

import { canViewAssetPrivateInfo } from '../../../utils/can';
import styles from './styles';

const useStyles = makeStyles(styles);

const cadastreRegExp = new RegExp(/^\d+$/);

function cadastreAvailable(data) {
  // Make sure the cadastre number contains only integers
  return cadastreRegExp.test(data.data.cadastre);
}

function PublicAssetInfo(props) {
  const {
    singleAsset,
    user,
  } = props;
  const { t } = useTranslation('translations');
  const classes = useStyles();

  return (
    <div className={`box ${classes.pubAssetInfoContainer}`}>
      <div className={`row ${classes.pubAssetLabelPart}`}>
        <p className={classes.pubAssetInfoLabel}>{t('translations:assets.assetInfo')}</p>
      </div>
      <Divider />
      <div className={`box ${classes.pubAssetBoxesContainer}`}>
        <div className='row center-xs'>
          <div className='col'>
            <InfoBox
              label={t('translations:assets.assetType')}
              info={t(`translations:assets.${assetTypeTitleKey(singleAsset.data)}`)}
            />
          </div>
          <div className='col'>
            <InfoBox
              label={t('translations:assets.totalArea')}
              info={singleAsset.data ? `${singleAsset.data.area} \u33A1` : ''}
              tooltip={t('tooltips:assets.assetInformation.totalArea')}
            />
          </div>
          <div className='col'>
            <InfoBox
              label={t('translations:assets.commonPartsArea')}
              info={singleAsset.data ? `${singleAsset.data.common_parts_area} \u33A1` : ''}
            />
          </div>
          <div className='col'>
            <InfoBox
              label={t('translations:assets.numberOfFlats')}
              info={singleAsset.data ? singleAsset.data.flats : ''}
            />
          </div>
          <div className='col'>
            <InfoBox
              label={t('translations:assets.heatedArea')}
              info={singleAsset.data ? `${singleAsset.data.heated_area} \u33A1` : ''}
              tooltip={t('tooltips:assets.assetInformation.heatedArea')}
            />
          </div>
          <div className='col'>
            <InfoBox
              label={t('translations:assets.billingArea')}
              info={singleAsset.data ? `${singleAsset.data.billing_area} \u33A1` : ''}
              tooltip={t('tooltips:assets.assetInformation.billingArea')}
            />
          </div>
          <div className='col'>
            <InfoBox
              label={t('translations:assets.numberOfFloors')}
              info={singleAsset.data ? singleAsset.data.floors : ''}
            />
          </div>
          <div className='col'>
            <InfoBox
              label={t('translations:assets.numberOfStaircases')}
              info={singleAsset.data ? singleAsset.data.stair_cases : ''}
            />
          </div>
          {canViewAssetPrivateInfo(user, singleAsset) && (
            <div className='col'>
              <InfoBox
                label={t('translations:assets.cadastreNumber')}
                info={singleAsset.data ? cadastreAvailable(singleAsset) ? singleAsset.data.cadastre : 'N/A' : 'N/A'}
                addStyle={{ fontSize: 16 }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );

}

function InfoBox(props) {
  const {
    label,
    info,
    addStyle,
    tooltip,
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.pubAssetInfoBoxElement}>
      <div className={classes.pubAssetBoxLabelContainer}>
        <p className={classes.pubAssetBoxLabel}>
          {label}
          {tooltip && (
            <UserTooltip
              title={tooltip}
              icon={<InfoIcon />}
              iconButtonProps={{ size: 'small', color: 'primary' }}
              placement="bottom-end"
            />
          )}
        </p>
      </div>
      <Divider />
      <div className={classes.pubAssetBoxText} style={{ ...addStyle }}>
        {info}
      </div>
    </div>
  );
}

export default connect(
  state => ({
    user: state.user,
  })
)(PublicAssetInfo);
