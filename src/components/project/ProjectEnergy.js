import React from 'react';

/// WRAPPERS
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

/// COMPONENTS
import EnergyTableWrapper from './../../containers/smartcomponents/TableWrappers/EnergyTableWrapper';

/// STYLES
const styles = theme => ({
  prjEnergyContainer: {
    margin: '30px',
    '@media screen and (max-width: 960px)': {
      margin: '10px',
    },
  },
})

class ProjectEnergy extends React.Component {

  render() {

    const { annexes, annex3Ready, updateEnergyTable, singleProject,
    loggedUserRole, classes } = this.props;

    const baseyear_n_2 = [
      annex3Ready ? annexes.table1.columns : null,
      annex3Ready ? annexes.table1.rows : null,
      [
        'baseyear_n_2'
      ]
    ];

    const baseyear_n_1 = [
      annex3Ready ? annexes.table2.columns : null,
      annex3Ready ? annexes.table2.rows : null,
      [
        'baseyear_n_1'
      ]
    ];
    const baseyear_n = [
      annex3Ready ? annexes.table3.columns : null,
      annex3Ready ? annexes.table3.rows : null,
      [
        'baseyear_n'
      ]
    ];

    return (
      <div className={classes.prjEnergyContainer}>
        <EnergyTableWrapper
          form={baseyear_n_2[2][0]}
          handleFormSubmit={updateEnergyTable}
          data={baseyear_n_2}
          singleProject={singleProject}
          loggedUserRole={loggedUserRole}
        />

        <EnergyTableWrapper
          form={baseyear_n_1[2][0]}
          handleFormSubmit={updateEnergyTable}
          data={baseyear_n_1}
          singleProject={singleProject}
          loggedUserRole={loggedUserRole}
        />
        <EnergyTableWrapper
          form={baseyear_n[2][0]}
          handleFormSubmit={updateEnergyTable}
          data={baseyear_n}
          singleProject={singleProject}
          loggedUserRole={loggedUserRole}
        />
      </div>
    );
  }
}

export default withRouter((connect(
)(withStyles(styles)(ProjectEnergy))))
