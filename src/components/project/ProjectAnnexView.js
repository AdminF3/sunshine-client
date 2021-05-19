import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Hidden,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  withStyles,
} from '@material-ui/core';
import {
  CloudDownload as DownloadIcon,
  MoreVert as MoreVertIcon,
} from '@material-ui/icons';

import { toggleActiveAnnex } from './../../actions/annex';

import Annex1 from './annex/Annex1';
import Annex2 from './annex/annex2';
import Annex3 from './annex/annex3';
import Annex4 from './annex/annex4';
import Annex5 from './annex/annex5';
import Annex6 from './annex/annex6';
import Annex7 from './annex/annex7';
import Annex8 from './annex/Annex8';
import AnnexStepper from './annex/AnnexStepper';
import ENDPOINTS from './../../constants/endpoints';
import { CountryFlag } from '../utils/SVGflags';

import { canEditProject } from '../../utils/can';

const styles = {
  prjAnnexContainer: {
    margin: '30px',
    '@media screen and (max-width: 960px)': {
      margin: '10px',
    },
  },
  downloadButton: {
    marginTop: 20,
  },
  downloadMenu: {
    '& .MuiButton-label': {
      marginRight: 32,
    },
    '& .MuiButton-endIcon': {
      marginRight: 0,
      marginLeft: 0,
      position: 'absolute',
      right: 8,
    }
  },
};

class ProjectAnnexView extends React.Component {
  renderAnnex = (props) => {
    const {
      activeAnnex,
      singleProject,
      singleAsset,
      annexes,
      annex1Ready,
      annex3Ready,
      annex4Ready,
      annex5Ready,
      updateBudgetTable,
      updateEnergyTable,
      updateMaintenanceTable,
      updateFeesTable,
      loggedUserRole,
      addTableRow,
      updateAnnexesFields,
      annex67Ready
    } = props;
    switch (activeAnnex) {
      case 1:
        return (
          <Annex2
            singleProject={singleProject}
          />
        );
      case 2:
        return (
          <Annex3
            annexes={annexes.annex3}
            annex3Ready={annex3Ready}
            updateEnergyTable={updateEnergyTable}
            singleProject={singleProject}
            loggedUserRole={loggedUserRole}
          />
        );
      case 3:
        return (
          <Annex4
            annexes={annexes.annex4}
            annex4Ready={annex4Ready}
            updateMaintenanceTable={updateMaintenanceTable}
            singleProject={singleProject}
            loggedUserRole={loggedUserRole}
            addTableRow={addTableRow}
          />
        );
      case 4:
        return (
          <Annex5
            annexes={annexes.annex5}
            annex5Ready={annex5Ready}
            updateFeesTable={updateFeesTable}
            singleProject={singleProject}
            loggedUserRole={loggedUserRole}
            addTableRow={addTableRow}
          />
        );
      case 5:
        return (
          <Annex6
            loggedUserRole={loggedUserRole}
            updateAnnexesFields={updateAnnexesFields}
            annexes={annexes.annex67.annex67Fields}
            annex67Ready={annex67Ready}
            singleAsset={singleAsset}
            singleProject={singleProject}
          />
        );
      case 6:
        return (
          <Annex7
            singleAsset={singleAsset}
            singleProject={singleProject}
            loggedUserRole={loggedUserRole}
            annex67Ready={annex67Ready}
            updateAnnexesFields={updateAnnexesFields}
            annexes={annexes.annex67.annex67Fields}
          />
        );
      case 7:
        return (
          <Annex8 />
        );
      default:
        return (
          <Annex1
            annexes={annexes.annex1}
            annex1Ready={annex1Ready}
            updateBudgetTable={updateBudgetTable}
            singleProject={singleProject}
            loggedUserRole={loggedUserRole}
            addTableRow={addTableRow}
            updateAnnexesFields={updateAnnexesFields}
          />
        );
    }
  }
  render() {
    const {
      toggleAnnex = toggleActiveAnnex,
      activeAnnex,
      singleAsset,
      annex1Ready,
      annex3Ready,
      annex4Ready,
      annex5Ready,
      annexes,
      updateEnergyTable,
      updateFeesTable,
      updateBudgetTable,
      updateMaintenanceTable,
      singleProject,
      loggedUserRole,
      addTableRow,
      updateAnnexesFields,
      annex67Ready,
      user,
      classes
    } = this.props;

    return (
      <div className={classes.prjAnnexContainer}>
        <div className="row">
          <Hidden mdUp>
            <div className="col-xs-12">
              <AnnexStepper toggleActiveAnnex={toggleAnnex} activeAnnex={activeAnnex}
              singleProject={singleProject} orientation="horizontal" />
            </div>
          </Hidden>
          <div className="col-md-8 col-xs-12">
              {
                this.renderAnnex({activeAnnex, singleProject, singleAsset, annexes,
                  annex1Ready, annex3Ready, annex4Ready, annex5Ready,
                  updateBudgetTable, updateEnergyTable, updateMaintenanceTable,
                  updateFeesTable, loggedUserRole, addTableRow, updateAnnexesFields, annex67Ready
                })
              }
          </div>
          <Hidden smDown>
            <div className="col-xs-4">
              <AnnexStepper
                toggleActiveAnnex={toggleAnnex}
                activeAnnex={activeAnnex}
                singleProject={singleProject}
                orientation="vertical"
              />
              <div className="center-xs">
                {loggedUserRole !== 'teme' && (
                  <DownloadButton
                    project={singleProject}
                    classes={classes}
                    user={user}
                  />
                )}
              </div>
            </div>
          </Hidden>
        </div>
      </div>
    );
  }
}

function DownloadButton(props) {
  const {
    project,
    classes,
    user
  } = props;
  const { t } = useTranslation('translations');
  const contractUrl = ENDPOINTS.SERVER + '/project/' + project._id + '/download';

  const [anchorEl, setAnchorEl] = useState(null);
  const closeMenu = () => setAnchorEl(null);

  const nativeCountry = project.dependencies[project.data?.asset]?.data?.country;

  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="secondary"
        endIcon={<MoreVertIcon />}
        label={t('translations:annexes.downloadContract')}
        fullWidth
        className={classes.downloadButton}
        onClick={e => setAnchorEl(e.target)}
        disabled={!canEditProject(project, user)}
      >
        {t('translations:annexes.downloadContract')}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        keepMounted
        className={classes.downloadMenu}
      >
        <MenuItem
          component={Button}
          href={`${contractUrl}/native`}
          endIcon={<DownloadIcon />}
          onClick={closeMenu}
        >

          <ListItemIcon>
            <CountryFlag country={nativeCountry} />
          </ListItemIcon>
          <Typography variant="inherit">{t('annexes.downloadContract')}</Typography>
        </MenuItem>
        <MenuItem
          component={Button}
          href={`${contractUrl}/english`}
          endIcon={<DownloadIcon />}
          onClick={closeMenu}
        >
          <ListItemIcon>
            <CountryFlag country="UK" />
          </ListItemIcon>
          <Typography variant="inherit">{t('annexes.downloadEnglishContract')}</Typography>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

const mapStateToProps = ( state ) => {
  return {
    activeAnnex: state.annex.activeAnnex,
    loggedUserRole: state.project.loggedUserRole,
    user: state.user,
  };
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    toggleAnnex: (index) => {
      dispatch(toggleActiveAnnex(index));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ProjectAnnexView));
