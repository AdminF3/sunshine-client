import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  Apartment as ApartmentIcon,
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  LocationCity as LocationCityIcon,
} from '@material-ui/icons';

import Tabbable from '../../../containers/smartcomponents/Tabbable/Tabbable';
import {
  residentialTypes,
  buildingTypeOther,
  nonResidentialCategories,
  assetImages,
} from '../../../constants/assetTypes';

const useStyles = makeStyles(theme => ({
  assetCard: {
    width: '100%',
    position: 'relative',

    '&.selected': {
      backgroundColor: theme.palette.secondary.main,
      boxShadow: theme.shadows[6],
    },
  },
  assetCardMedia: {
    paddingTop: '68%',
  },
  assetCardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    '&:last-child': {
      paddingBottom: theme.spacing(2),
    },

  },
}));

const assetItems = {
  residential: residentialTypes.map(({ id, title }) => ({
    id,
    title,
    imgSrc: assetImages[id],
  })),
  nonResidential: nonResidentialCategories.map(({ id, title }) => ({
    id,
    title,
    imgSrc: assetImages[id],
  })),
};

const assetCategoryTypes = Object.keys(assetItems);

function AssetTypeForm(props) {
  const {
    building_type,
    category,
    handleSetData,
    disabled,
  } = props;
  const classes = useStyles();
  const { t } = useTranslation('translations');
  const defaultTab = category && category.indexOf('nonresidential') === 0 ? 1 : 0;
  const [currentTab, setCurrentTab] = useState(defaultTab);
  const currentCategoryType = assetCategoryTypes[currentTab];

  const handleSelect = (assetID) => {
    if (currentTab === 0) {
      handleSetData({
        building_type: assetID,
        category: 'residential',
      });

      return;
    }
    handleSetData({
      building_type: buildingTypeOther.id,
      category: assetID,
    });
  };

  return (
    <React.Fragment>
      <Tabbable
        defaultTab={currentTab}
        onChange={idx => setCurrentTab(idx)}
        tabs={[
          { label: t('assets.typeResidential'), icon: <ApartmentIcon /> },
          { label: t('assets.typeNonResidential'), icon: <LocationCityIcon /> },
        ]}
      >
        <Grid container spacing={2}>
          {assetItems[currentCategoryType].map((assetTypeProps) => {
            const { id, imgSrc } = assetTypeProps;
            const title = t(`assets.${assetTypeProps.title}`);
            const selected = (currentTab === 0 ? building_type : category) === id;

            return (
              <Grid item key={id} sm={3}>
                <Card className={`${classes.assetCard} ${selected ? 'selected' : ''}`.trim()}>
                  <CardActionArea
                    onClick={() => handleSelect(!selected ? id : '')}
                    disabled={disabled}
                  >
                    <CardMedia
                      className={classes.assetCardMedia}
                      image={imgSrc}
                      title={title}
                    />
                    <CardContent className={classes.assetCardContent}>
                      <Typography variant="h5">
                        {title}
                      </Typography>
                      {selected ? <CheckBoxIcon size="large" /> : <CheckBoxOutlineBlankIcon size="large" />}
                    </CardContent>

                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Tabbable>
    </React.Fragment>
  );
}

AssetTypeForm.propTypes = {
  building_type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  category: PropTypes.string,
  handleSetData: PropTypes.func.isRequired,
};

export default AssetTypeForm;
