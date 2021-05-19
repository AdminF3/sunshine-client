import React from 'react';
import { Query } from '@apollo/react-components';
// WRAPPERS
import { withStyles } from '@material-ui/core/styles';

// COMPONENTS
import BasementPipesTable from './../BasementPipesTable/BasementPipesTable';
import AtticPipesTable from './../AtticPipesTable/AtticPipesTable';
import BuildingEnvelope from './../BuildingEnvelope/BuildingEnvelope';
import ProgressBar from './../../../utils/ProgressBar';
import TotalsAndIndoorTemp from './../TotalsAndIndoorTemp/TotalsAndIndoorTemp'
import IndoorClimaWrapper from './../IndoorClimaWrapper';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import { GET_INDOORCLIMA } from '../../../../actions/projectsQueries';
import { initialValues } from '../../../../functions/normalizeInitialIndoorClimaData';

import styles from './styles';

class ProjectIndoorClima extends React.Component {
  state = {
    expanded: null
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { expanded } = this.state;
    const {
      singleProject,
      updateIndoorClima,
      singleProjectReady,
      classes
    } = this.props;

    return (
      <Query
        query={GET_INDOORCLIMA}
        variables={{
          id: singleProject._id
        }}
      >
        {({ data, loading }) => {
          if (loading) {
            return <ProgressBar />;
          }
          const indoor = data.getIndoorClima;
          return (
            <div className={classes.prjEnergyContainer}>
              <div className={`row ${classes.prjEnergyInnerContainer}`}>
                <div className='col-lg-8 col-md-12'>
                  <Accordion
                    expanded={expanded === 'panel1'}
                    onChange={this.handleChange('panel1')}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography className={classes.expandableTitle}>Building Envelope</Typography>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails className={classes.expansionPanelDetails}>
                      <IndoorClimaWrapper
                        child={<BuildingEnvelope initVal={initialValues(indoor)} singleProject={singleProject} singleProjectReady={singleProjectReady} />}
                        handleFormSubmit={updateIndoorClima}
                        initialValues={initialValues(indoor)}
                        projectId={singleProject._id}
                      />
                    </AccordionDetails>
                  </Accordion>

                  <Accordion
                    expanded={expanded === 'panel2'}
                    onChange={this.handleChange('panel2')}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography className={classes.expandableTitle}>Totals and Indoor Temperature</Typography>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails className={classes.expansionPanelDetails}>
                      <IndoorClimaWrapper
                        child={<TotalsAndIndoorTemp initVal={initialValues(indoor)} singleProject={singleProject} singleProjectReady={singleProjectReady} />}
                        handleFormSubmit={updateIndoorClima}
                        initialValues={initialValues(indoor)}
                        projectId={singleProject._id}
                      />
                    </AccordionDetails>
                  </Accordion>
                </div>

                <div className='col-lg-4 col-md-12' style={{ paddingLeft: 0 }}>
                  <IndoorClimaWrapper
                    child={<AtticPipesTable initVal={initialValues(indoor)} />}
                    handleFormSubmit={updateIndoorClima}
                    initialValues={initialValues(indoor)}
                    projectId={singleProject._id}
                  />
                  <IndoorClimaWrapper
                    child={<BasementPipesTable initVal={initialValues(indoor)} />}
                    handleFormSubmit={updateIndoorClima}
                    initialValues={initialValues(indoor)}
                    projectId={singleProject._id}
                  />
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(ProjectIndoorClima);
