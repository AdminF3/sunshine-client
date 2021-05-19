import React from 'react';
import './annex2.css';
import diagram from './../../../images/Diagram1.png';

// COMPONENTS
import DetailedAccordion from './ExpandablePanel';

export default class ProjectAnnexView extends React.Component {
  render() {
    const annexPage = () => {
      return (
        <div className='mainContainer'>
          <div className='paragraphs'><span>1.</span>During the Heating Season the indoor temperature in the Apartments of the Building has to comply with the limits set in Diagram No 1:</div>
          <div className='diagramContainer'>
            <img alt='diagram' src={diagram} className='diagram' />
          </div>
          <div className='paragraphs'><span>2.</span>Heating in the common areas of the Building, for example, stairways, attic and basement, can be disconnected. After the Renovation Works are implemented in the Building the Contractor shall ensure temperature levels in the common areas of the stairways of a minimum of 5°C.</div>
          <div className='paragraphs'><span>3.</span>The Contractor shall ensure domestic hot water supply according to LABEEF Financial and Technical Rules and Guidelines for Energy Efficiency Measures.</div>
          <div className='paragraphs'><span>4.</span>The Contractor shall implement the Renovation Works described in Annex No. 1 of this Agreement, inter alia shall:
              <div><span>4.1.</span>ensure proper protection of the Building from impact of weather by preventing infiltration of water and damage of the structures to the extent possible (excluding infiltration of well water and ground water, as well as damage caused by such well water, ground waters or other force majeure events);</div>
            <div><span>4.2.</span>ensure the Heat Supply during the Heating Season alone or through third parties jointly or severally in a manner appropriate to fulfil, in particular, the conditions of Annex 2 to this Agreement. The Contractor is not liable for disruptions in or lack of Heat Supply to the Building or any part thereof in cases that are beyond the control of the Contractor, including when such cases are due to the failure of the heating company to supply heating;</div>
            <div><span>4.3.</span>ensure adequate level of ventilation in the Apartments as prescribed additionally in the LABEEF Financial and Technical Rules and Guidelines for Energy Efficiency Measures and provided for in the General Terms and Conditions to prevent occurrence of mildew and excessive humidity;</div>
            <div><span>4.4.</span>ensure adequate level of ventilation in the Apartments as prescribed additionally in the LABEEF Financial and Technical Rules and Guidelines for Energy Efficiency Measures and provided for in the General Terms and Conditions to prevent occurrence of mildew and excessive humidity;</div>
            <div><span>4.5.</span>guarantee, at its own expense, Proper Functioning of the Facilities installed or introduced by the Contractor, including domestic hot water supply and heating equipment, junctions and pipelines, during the entire validity period of the Agreement, inter alia, by repairing or replacing the Facilities, if necessary;</div>
            <div><span>4.6.</span>guarantee, at its own expense, the effect and efficiency of the insulating materials installed or introduced by the Contractor in line with their specifications and normal wear and tear, save for cases referred to in Clause 10.3 of the General Terms and Conditions of this Agreement.</div>
          </div>
          <div className='paragraphs'><span>5.</span>The Contractor shall ensure that all eligibility criteria applicable towards residential buildings and as specifically listed in the General Terms and Conditions and under the applicable LABEEF Financial and Technical Rules and Guidelines for Energy Efficiency Measures in force at the time of signing of this Agreement are duly implemented and fully met.</div>
        </div>
      );
    };

    return (
      <div>
        <DetailedAccordion expanded={true} label='Safety, Quality and Comfort Guaranteed' data={annexPage()} />
      </div>
    );
  }
}
