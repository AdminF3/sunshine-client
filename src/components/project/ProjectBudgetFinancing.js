import React from 'react';
//import PropTypes from 'prop-types';

/// WRAPPERS
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles'

/// COMPONENTS
import Annex1 from './annex/Annex1';

/// STYLES
const styles = theme => ({
  prjEnergyContainer: {
    margin: '30px',
    '@media screen and (max-width: 960px)': {
        margin: '10px',
    }
  }
})

class ProjectBudgetFinancing extends React.Component {
  render() {
    const { annexes, annex1Ready, updateBudgetTable, singleProject,
    loggedUserRole, classes } = this.props;
    return (
      <div className={classes.prjEnergyContainer}>
        { annex1Ready
          ? <Annex1
              annexes={annexes.annex1}
              annex1Ready={annex1Ready}
              updateBudgetTable={updateBudgetTable}
              singleProject={singleProject}
              loggedUserRole={loggedUserRole}
            />
          : null
        }
      </div>
    );
  }
}

export default withRouter((connect(
)(withStyles(styles)(ProjectBudgetFinancing))))
