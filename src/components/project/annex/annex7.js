import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

// WRAPPERS
import { withTranslation } from 'react-i18next';
import { Field } from 'redux-form';
import { textInput } from './../../../components/utils/redux-form-wrappers/redux-form-wrappers';
import AnnexWrapper from './AnnexWrapper';
import ENDPOINTS from './../../../constants/endpoints';

// Components
import ExpandablePanel from './ExpandablePanel';
import RaisedButton from '@material-ui/core/Button';
import ProgressBar from './../../../components/utils/ProgressBar';

import { canEditProject } from '../../../utils/can';

const inputStyle = {
  borderRadius: '4.3px',
  border: 'solid 1.1px #dfe3e9',
  width: '369.1px',
  height: '38.7px',
  marginRight: '100px',
  fontSize: '18px',
  textAlign: 'center'
};
const innerInputStyle = {
  borderRadius: '4.3px',
  border: 'solid 1.1px #dfe3e9',
  fontSize: '14px'
};
const inputLabelStyle = {
  fontSize: '15.2px',
  fontWeight: '600',
  textAlign: 'left',
  color: '#7f8fa4',
  marginBottom: '10px'
};
const textStyle = {
  size: '14px',
  align: 'left',
  lineHeight: '21px',
  color: '#7f8fa4',
  marginTop: '20px',
};

const inputer = (input, style) => (
  <div style={{ display: 'inline-block' }}>
    <Field name={input} component={textInput} addStyle={style} addClass={{ inputClass: 'project-annex-input' }} />
  </div>
);

const authorizedRepresentitivesFiller = (singleProject, user) => {
  return (
    <div>
      <div className='row' style={{ ...textStyle, display: 'inline-block' }}>
        On this day {inputer('date-of-meeting', innerInputStyle)} a Meeting was held of the Apartment Owners of the Building located at {inputer('address-of-building', innerInputStyle)}. The current meeting has been duly convened and held in accordance with Arts.
          17 and 18 of the Latvian Apartment Ownership Act (AOA) pursuant to a written invitation sent to/announced to the Apartmenst Owners within the statutory provided term, as well as according to the procedure established by the General meeting of the Apartment Owners, if applicable.
          The Meeting is attended by representatives of more than one half of all apartment properties in the Building as entered in the land register as evidenced in the list of present members attached hereby.
          Pursuant to the above, it is established that all preconditions for rendering the conduct of the Meeting as valid and legal, and its decisions - as binding on the owners in accordance with Art. 19(2) of the AOA have been met.
          These minutes are prepared and signed pursuant to the conditions set out in Art. 18(6) of the AOA. The Meeting was opened by {inputer('meeting-opened-by', innerInputStyle)}, who established that all conditions for duly convening and holding of the Meeting have been met.
          Representatives of more than one half of the shares of common ownership are present, there is quorum and decisions may be validly adopted by means of voting as per the conditions set out in Art 19(3) AOA.
          After careful review and consideration of the documents furnished to the Owners prior to the Meeting, in accordance with Art. 17(2), the Apartment Owners of the Building located at {inputer('address-of-building', innerInputStyle)}, RESOLVED:
          To elect {inputer('chair-of-meeting', innerInputStyle)} as a chair of the meeting and {inputer('meeting-recorded-by', innerInputStyle)} as a person responsible for keeping the meeting’s record (Minutes of the meeting)."
        </div>
      <div className='row' style={{ marginTop: '40px' }}>
        <div className='col'>
          <div className='row' style={inputLabelStyle}> FOR </div>
          {/* <input className='row' style={inputStyle}/> */}
          {inputer('tab1-for-n', inputStyle)}
        </div>
        <div className='col'>
          <div className='row' style={inputLabelStyle}> AGAINST </div>
          {/* <input className='row' style={inputStyle}/> */}
          {inputer('tab1-against-n', inputStyle)}
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

const item1Filler = (singleProject, user) => {
  return (
    <div>
      <div className='row' style={textStyle}>
        To renovate the Building by conducting all such measures that seek to improve its Energy Efficiency, internal or external appearance while raising the standards of living of the Building.
        To ensure the above, it is decided to appoint {inputer('measurement-implementer', innerInputStyle)}, holding sufficient experience and professional expertise to implement a set of measures for improving the Energy
        Efficiency and Heat Supply of the Building while ensuring comfort living standards at the Building and while concurrently reducing the overall Energy consumption
        of the Building. For the purposes of achieving the above, {inputer('measurement-implementer', innerInputStyle)} shall conduct an energy audit over the Building and a review of the general current energy and hot
        water consumption and prior undertaking of any Energy Efficiency Measures.
      </div>
      <div className='row' style={{ marginTop: '40px' }}>
        <div className='col'>
          <div className='row' style={inputLabelStyle}> FOR </div>
          {inputer('tab2-for-n', inputStyle)}
        </div>
        <div className='col'>
          <div className='row' style={inputLabelStyle}> AGAINST </div>
          {inputer('tab2-against-n', inputStyle)}
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

const item2Filler = (singleProject, user) => {
  return (
    <div>
      <div className='row' style={{ ...textStyle, display: 'inline-block' }}>
        To conclude an Energy Performance Contract (EPC) with {inputer('measurement-implementer', innerInputStyle)}, attached as Schedule No. 1 and forming inseparable part of these Minutes, and whose terms and conditions outlined in brief as Schedule No. 2 to these Minutes, have been duly reviewed,
        thoroughly understood and fully accepted by the Owners and whereas the Apartment Owners shall ensure regular payments in full of the monthly Fee indicated therein. The Owners hereby authorize the Administrator of the Building, namely
         {inputer('building-administrator', innerInputStyle)} to represent them for the purposes of the conclusion of the EPC, in the version as hereby attached as Schedule 1 and to sign the latter in their name and on their behalf.
         The person authorized hereinabove shall be duly entitled to represent and bind the General meeting of the Apartment Owners by undertaking all due legal and factual actions required to prepare, submit and receive all due applications along with any other documents that may be deemed required for the purposes of receiving additional
         funding from the State or other funding institution in the form of a grant, loan or other incentive. The Owners hereby acknowledge that by making this decision, they become jointly and severally liable for the performance of their obligations stipulated in and stemming from the EPC contract referred to above.
      </div>

      <div className='row' style={{ marginTop: '40px' }}>
        <div className='col'>
          <div className='row' style={inputLabelStyle}> FOR </div>
          {inputer('tab3-for-n', inputStyle)}
        </div>
        <div className='col'>
          <div className='row' style={inputLabelStyle}> AGAINST </div>
          {inputer('tab3-against-n', inputStyle)}
        </div>
      </div>

      <div className='row' style={textStyle}>
        There being no further items set in the agenda, the Meeting was adjourned and in witness thereof these Minutes have been issued and signed in evidence of each of the abovementioned decisions.
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

const schedule1And2 = () => {
  return (
    <div>
      <div className='row' style={{ fontSize: '14px', fontWeight: 'bold', lineHeight: '1.5', color: '#354052' }}>
        SCHEDULE NO. 1 to MINUTES OF THE GENERAL MEETING OF APARTMENT OWNERS OF THE BUILDING
      </div>

      <div className='row' style={{ size: '14px', align: 'left', lineHeight: '21px', color: '#7f8fa4', marginTop: '20px', marginBottom: '20px' }}>
        ENERGY PERFORMANCE CONTRACT
        Template agreement
      </div>

      <div className='row' style={{ fontSize: '14px', fontWeight: 'bold', lineHeight: '1.5', textAlign: 'center', color: '#354052' }}>
        SCHEDULE NO. 2 to MINUTES OF THE GENERAL MEETING OF APARTMENT OWNERS OF THE BUILDING
      </div>

      <div className='row' style={{ size: '14px', align: 'left', lineHeight: '21px', color: '#7f8fa4', marginTop: '20px', marginBottom: '20px' }}>
        SPECIAL CONDITIONS FOR THE ENERGY PERFORMANCE CONTRACT APPROVED BY THE GENERAL MEETING OF APARTMENT OWNERS OF THE BUILDING
      </div>
    </div>
  );
};

class ProjectAnnexView extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: 'panel1'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(panel) {
    const { expanded } = this.state;
    this.setState({
      expanded: expanded !== panel ? panel : false,
    });
  }

  render() {
    const { expanded } = this.state;
    const {
      singleAsset,
      updateAnnexesFields,
      singleProject,
      annexes,
      annex67Ready,
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
    const authorizedRepresentitives = (
      <AnnexWrapper
        data={authorizedRepresentitivesFiller(singleProject, user)}
        handleFormSubmit={updateAnnexesFields}
        initialValues={annex67Initial}
        projectId={singleProject._id}
      />
    );

    const item1 = (
      <AnnexWrapper
        data={item1Filler(singleProject, user)}
        handleFormSubmit={updateAnnexesFields}
        initialValues={annex67Initial}
        projectId={singleProject._id}
      />
    );

    const item2 = (
      <AnnexWrapper
        data={item2Filler(singleProject, user)}
        handleFormSubmit={updateAnnexesFields}
        initialValues={annex67Initial}
        projectId={singleProject._id}
      />
    );
    const contractUrl = ENDPOINTS.SERVER + '/project/' + singleProject._id + '/download';
    return (
      <React.Fragment>
        <ExpandablePanel
          expanded={expanded === 'panel1'}
          onChange={() => this.handleChange('panel1')}
          label="AUTHORIZED REPRESENTITIVES"
          data={authorizedRepresentitives}
        />
        <ExpandablePanel
          expanded={expanded === 'panel2'}
          onChange={() => this.handleChange('panel2')}
          label="ITEM 1"
          data={item1}
        />
        <ExpandablePanel
          expanded={expanded === 'panel3'}
          onChange={() => this.handleChange('panel3')}
          label="ITEM 2"
          data={item2}
        />
        <ExpandablePanel
          expanded={expanded === 'panel4'}
          onChange={() => this.handleChange('panel4')}
          label="SCHEDULE NO.1 & 2"
          data={schedule1And2(contractUrl, singleProject, user)}
        />
      </React.Fragment>
    );
  }
}

export default withTranslation('translations', 'serverMessages')(connect(
  state => ({
    user: state.user
  }),
)(ProjectAnnexView));
