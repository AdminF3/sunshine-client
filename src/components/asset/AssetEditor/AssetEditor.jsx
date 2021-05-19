import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import StepperEditor from '../../../containers/smartcomponents/StepperEditor/StepperEditor';
import { createOrUpateAsset } from '../../../actions/assets';
import { assetRegisterReducer, assetRegisterInitialState } from './reducers';
import { parseAddress, addressToJSON } from '../utils';
import {
  AssetLocationForm,
  AssetAddressForm,
  AssetTypeForm,
  AssetInformationForm,
} from '../AssetForms';

const steps = [
  {
    label: 'assets.location',
    requiredFields: ['addressLocation'],
    requiredDataTransKey: 'assets.fillMapLocation',
    Component: AssetLocationForm,
  },
  {
    label: 'assets.address',
    requiredFields: [
      'addressLocationMap.streetAddress',
      'addressLocationMap.city',
      'addressLocationMap.postcode',
      'addressLocationMap.country',
    ],
    Component: AssetAddressForm,
  },
  {
    label: 'assets.assetType',
    title: 'assets.assetType',
    requiredFields: ['building_type', 'category'],
    Component: AssetTypeForm,
  },
  {
    label: 'assets.information',
    requiredFields: ['cadastre', 'owner', 'area', 'heating_type', 'stair_cases'],
    requiredDataTransKey: 'assets.fillInFinalData',
    Component: AssetInformationForm,
  },
];

function AssetEditor(props) {
  const {
    title,
    data,
    submitCreateOrUpdate,
    handleClose,
  } = props;

  const h = useHistory();

  const onFinalize = (d) => {
    submitCreateOrUpdate(d).then(res => {
      if (res.message === 'conflict') {
        return;
      }
      handleClose();
      if (!d.ID && res._id) {
        h.push(`/asset/${res._id}`);
      }
    });
  };

  return (
    <StepperEditor
      open={props.open}
      loading={props.updating}
      title={title}
      steps={steps}
      reducerFn={assetRegisterReducer}
      initialState={assetDataInitialState(data)}
      handleClose={handleClose}
      handleFinalize={onFinalize}
      disabled={data?.valid === 2}
    />
  );
}

// eslint-disable-next-line complexity
function assetDataInitialState(data) {
  const initialState = { ...assetRegisterInitialState };

  if (!data) {
    return initialState;
  }

  for (const k in data) {
    if (Object.keys(assetShape).indexOf(k) === -1 || !data[k]) {
      continue;
    }

    if (k === 'owner') {
      initialState[k] = data[k]._id;
      continue;
    }

    if (k === 'esco') {
      initialState[k] = data[k]._id;
      continue;
    }

    if (k === 'address') {
      const addressLocaionMap = addressToJSON(data[k], { country: data.country });
      initialState.addressLocationMap = addressLocaionMap;
      initialState.addressLocation = {
        ...initialState.addressLocation,
        display_name: parseAddress(data[k]),
        address: {
          city: addressLocaionMap.city,
          country: addressLocaionMap.country,
          road: addressLocaionMap.streetAddress,
          postcode: addressLocaionMap.postcode,
        },
      };
      continue;
    }

    if (k === 'coordinates') {
      initialState.addressLocation = {
        ...initialState.addressLocation,
        lat: String(data[k].lat),
        lon: String(data[k].lng),
      };
      initialState.mapCenter = [data[k].lat, data[k].lng];
      continue;
    }

    if (typeof data[k] === 'number') {
      initialState[k] = String(data[k]);
      continue;
    }

    initialState[k] = data[k];
  }

  return initialState;
}

const assetShape = {
  ID: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  cadastre: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  esco: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }),
  area: PropTypes.number.isRequired,
  common_parts_area: PropTypes.number.isRequired,
  heated_area: PropTypes.number.isRequired,
  billing_area: PropTypes.number.isRequired,
  flats: PropTypes.number.isRequired,
  floors: PropTypes.number.isRequired,
  stair_cases: PropTypes.number.isRequired,
  building_type: PropTypes.number.isRequired,
  category: PropTypes.string,
  heating_type: PropTypes.number.isRequired,
  country: PropTypes.string.isRequired,
  coordinates: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
};

AssetEditor.propTypes = {
  open: PropTypes.bool.isRequired,
  data: PropTypes.shape(assetShape),
};

AssetEditor.defaultProps = {
  open: false,
};

export default connect(
  state => ({
    updating: state.asset.updating,
  }),
  dispatch => ({
    submitCreateOrUpdate: (data) => dispatch(createOrUpateAsset(data)),
  }),
)(AssetEditor);
