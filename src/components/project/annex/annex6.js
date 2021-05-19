import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import ExpandablePanel from './ExpandablePanel';
import RaisedButton from '@material-ui/core/Button';

// WRAPPERS
import { withTranslation } from 'react-i18next';
import AnnexWrapper from './AnnexWrapper';
import { Field } from 'redux-form';
import { textInput } from './../../../components/utils/redux-form-wrappers/redux-form-wrappers';

// COMPONENTS
import ProgressBar from './../../../components/utils/ProgressBar';

import { canEditProject } from '../../../utils/can';

const inputStyle = {
  borderRadius: '4.3px', border: 'solid 1.1px #dfe3e9', width: '369.1px', height: '38.7px', marginRight: '100px'
};
const inputLabelStyle = {
  fontSize: '15.2px', fontWeight: '600', textAlign: 'left', color: '#7f8fa4', marginBottom: '10px'
};
const textStyle = {
  size: '14px', align: 'left', lineHeight: '21px', color: '#7f8fa4', marginTop: '20px'
};
const inputer = (input, style, value) => (
  <Field
    name={input}
    component={textInput}
    addStyle={style}
    addClass={{ inputClass: 'project-annex-input' }}
    value={value}
  />
);

const authorizedRepresentitivesFiller = (singleProject, user) => {
  return (
    <div>
      <div>
        <div className='row' style={textStyle}>
          <span>
            <span style={{ color: '#3a3d54' }}>
              <b>The Contractor’s authorized representative</b>
            </span> in all matters related to the present Agreement is:
          </span>
        </div>

        <div className='row' style={{ marginTop: '40px' }}>
          <div className='col'>
            <div className='row' style={inputLabelStyle}> First and Last Name </div>
            {inputer('contractor-name', inputStyle)}
          </div>

          <div className='col'>
            <div className='row' style={inputLabelStyle}> Personal ID Number </div>
            {inputer('contractor-id', inputStyle)}
          </div>
        </div>

        <div className='row' style={{ marginTop: '40px' }}>
          <div className='col'>
            <div className='row' style={inputLabelStyle}> Telephone </div>
            {inputer('contractor-phone', inputStyle)}
          </div>

          <div className='col'>
            <div className='row' style={inputLabelStyle}> Email </div>
            {inputer('contractor-email', inputStyle)}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '50px' }}>
        <div className='row' style={textStyle}>
          <span>
            <span style={{ color: '#3a3d54' }}>
              <b>The Client`s authorized representative</b>
            </span> in all matters related to the present Agreement is:
          </span>
        </div>

        <div className='row' style={{ marginTop: '40px' }}>
          <div className='col'>
            <div className='row' style={inputLabelStyle}> First and Last Name </div>
            {inputer('client-name', inputStyle)}
          </div>

          <div className='col'>
            <div className='row' style={inputLabelStyle}> Personal ID Number </div>
            {inputer('client-id', inputStyle)}
          </div>
        </div>

        <div className='row' style={{ marginTop: '40px' }}>
          <div className='col'>
            <div className='row' style={inputLabelStyle}> Telephone </div>
            {inputer('client-phone', inputStyle)}
          </div>

          <div className='col'>
            <div className='row' style={inputLabelStyle}> Email </div>
            {inputer('client-email', inputStyle)}
          </div>
        </div>
      </div>
      <RaisedButton
        variant='contained'
        type='submit'
        className='box-xs table-update-button'
        fullWidth={false}
        style={{ float: 'right', position: 'relative', backgroundColor: '#ffeb3b', padding: '0px 20px', marginTop: '10px' }}
        disabled={!canEditProject(singleProject, user)}
      >
        Save
      </RaisedButton>
    </div>
  );
};

class ProjectAnnexView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: 'panel1',
      ready: false
    };
  }

  handleChange = panel => (event, expanded) => {
    this.forceUpdate();
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  renderInitValues(initialValues) {
    this.setState({
      initialValues
    });
  }

  render() {
    const { expanded } = this.state;
    const {
      updateAnnexesFields,
      singleProject,
      annexes,
      annex67Ready,
      singleAsset,
      user
    } = this.props;

    if (!annex67Ready) {
      return <ProgressBar />;
    }

    const annex67Initial = {
      'contractor-name': annexes['contractor-name'],
      'contractor-id': annexes['contractor-id'],
      'contractor-phone': annexes['contractor-phone'],
      'contractor-email': annexes['contractor-email'],
      'client-name': annexes['client-name'],
      'client-id': annexes['client-id'],
      'client-phone': annexes['client-phone'],
      'client-email': annexes['client-email'],
      'date-of-meeting': annexes['date-of-meeting'] ? annexes['date-of-meeting'] : moment().format('Do MMMM YYYY'),
      'address-of-building': annexes['address-of-building'] !== '' ? annexes['address-of-building'] : singleAsset.data.address,
      'meeting-opened-by': annexes['meeting-opened-by'],
      'chair-of-meeting': annexes['chair-of-meeting'],
      'meeting-recorded-by': annexes['meeting-recorded-by'],
      'tab1-for-n': annexes['tab1-for-n'],
      'tab1-against-n': annexes['tab1-against-n'],
      'measurement-implementer': annexes['measurement-implementer'],
      'tab2-for-n': annexes['tab2-for-n'],
      'tab2-against-n': annexes['tab2-against-n'],
      'building-administrator': annexes['building-administrator'],
      'tab3-for-n': annexes['tab3-for-n'],
      'tab3-against-n': annexes['tab3-against-n']
    };

    const authorizedRepresentitives = () => {
      return (
        <AnnexWrapper
          handleFormSubmit={updateAnnexesFields}
          data={authorizedRepresentitivesFiller(singleProject, user)}
          initialValues={annex67Initial}
          projectId={singleProject._id}
        />
      );
    };

    return (
      <ExpandablePanel
        expanded={expanded === 'panel1'}
        onChange={this.handleChange('panel1')}
        label='Authorized Representatives'
        data={authorizedRepresentitives()}
      />
    );
  }
}

export default withTranslation('translations', 'serverMessages')(connect(
  state => ({
    user: state.user
  }),
)(ProjectAnnexView));
