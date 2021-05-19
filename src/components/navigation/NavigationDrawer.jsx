import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  Hidden,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  Home as HomeIcon,
  BusinessCenter as OrganizationIcon,
  Business as AssetIcon,
  Equalizer as ProjectIcon,
  Security as AdminIcon,
  TableChart as TableChartIcon,
} from '@material-ui/icons';
import {
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
} from '@material-ui/lab';

import { getMyOrganizations as getMyOrganizationsAction } from '../../actions/organizations';
import { getMyProjects as getMyProjectsAction } from '../../actions/projects';
import { isResidentsCommunity } from '../../constants/legalStatusTypes';
import PrivacyPolicyDialog from '../utils/PrivacyPolicyDialog';
import GDPRDialog from '../utils/GDPR/GDPRDialog';
import CountryRolesDialog from '../utils/CountryRolesDialog/CountryRolesDialog';
import PopUp from '../utils/PopUp';
import Input from '../utils/Input';
import { access as hasAccess } from '../../utils/can';
import logoIMG from '../../images/Sunshine-Logo-Platform.png';
import logoBannerIMG from '../../images/Sunshine-Logo-FB1200x627.png';
import finEERGoDomIMG from '../../images/Logo-FinEERGoDom-H-300x54.png';
import europe from '../../images/flags/europe.svg';
import MeetingRegister from '../organization/OrganizationMeetings/OrganizationMeetingsRegister/MeetingRegister';
import styles from './styles';

const useStyles = makeStyles(styles);

const menuItems = [
  {
    url: '/',
    exact: true,
    titleKey: 'navigation.home',
    icon: <HomeIcon />,
  },
  {
    url: '/organizations',
    matchеsRegExp: new RegExp('^/organization'),
    titleKey: 'navigation.organizations',
    icon: <OrganizationIcon />,
  },
  {
    url: '/assets',
    matchеsRegExp: new RegExp('^/asset'),
    titleKey: 'navigation.assets',
    icon: <AssetIcon />,
  },
  {
    url: '/projects',
    matchеsRegExp: new RegExp('^/project'),
    titleKey: 'navigation.projects',
    icon: <ProjectIcon />,
    authCheck: 'loggedin',
  },
  {
    divider: true,
    authCheck: 'loggedin',
  },
  {
    url: '/reports',
    titleKey: 'navigation.reports',
    icon: <TableChartIcon />,
    authCheck: 'loggedin',
  },
  {
    url: '/admin',
    titleKey: 'navigation.admin',
    icon: <AdminIcon />,
    authCheck: { admin: true, countryRole: ['country_admin'] },
  },
];

function NavigationDrawer(props) {
  const {
    user,
    organization,
    project,
    getMyOrganizations,
    getMyProjects,
    mobileOpen,
    onMobileClose,
  } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <Hidden mdUp implementation="css">
        <Drawer
          classes={{
            paper: classes.drawer,
          }}
          variant="temporary"
          open={mobileOpen}
          onClose={onMobileClose}
        >
          <DrawerMenu
            user={user}
            organization={organization}
            project={project}
            getMyOrganizations={getMyOrganizations}
            getMyProjects={getMyProjects}
          />
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawer,
          }}
          variant="permanent"
          open
        >
          <DrawerMenu
            user={user}
            organization={organization}
            project={project}
            getMyOrganizations={getMyOrganizations}
            getMyProjects={getMyProjects}
          />
        </Drawer>
      </Hidden>
    </React.Fragment>
  );
}

function DrawerMenu(props) {
  const {
    user,
    organization,
    project,
    getMyOrganizations,
    getMyProjects,
  } = props;

  const { myOrganizationsNumber } = organization;
  const { myProjectsNumber } = project;
  const userID = user?.profileInfo?._id;
  const classes = useStyles();
  const { t } = useTranslation('translations');

  const [meetingDialogType, setMeetingDialogType] = useState(null);
  const [meetingTypeValue, setMeetingTypeValue] = useState(null);
  const [countryAdminDialogOpen, setCountryAdminDialogOpen] = useState(false);
  const toggleCountryAdminDialog = () => setCountryAdminDialogOpen(!countryAdminDialogOpen);

  useEffect(() => {
    if (!userID) {
      return;
    }
    if (myOrganizationsNumber === null) {
      getMyOrganizations(userID, true);
    }
    if (myProjectsNumber === null) {
      getMyProjects(userID, true);
    }
  }, [myOrganizationsNumber, getMyOrganizations, userID, myProjectsNumber, getMyProjects]);

  return (
    <React.Fragment>
      <div className="top">
        <Link to="/" className={classes.logoLink}>
          <img src={logoIMG} alt="Sunshine" />
        </Link>
        <Divider className={classes.divider} />

        <MenuList open disablePadding component="div" className={classes.menu}>
          {menuItems.map((mi, i) => {
            if (!hasAccess(user, mi.authCheck)) {
              return null;
            }

            if (mi.divider) {
              return <Divider variant="middle" key={i} className={classes.listDivider} />;
            }

            const { url, exact, icon, titleKey, matchеsRegExp } = mi;

            return (
              <MenuItem
                key={url}
                component={NavLink}
                to={url}
                exact={Boolean(exact)}
                isActive={(match, { pathname }) => {
                  if (match) {
                    return true;
                  }

                  if (!matchеsRegExp) {
                    return false;
                  }

                  return matchеsRegExp.test(pathname);
                }}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText>{t(titleKey)}</ListItemText>
              </MenuItem>
            );
          })}
        </MenuList>
      </div>
      <div className="bottom">
        <div className={classes.europeanWrapper}>
          <img src={europe} alt="Sunshine" />
          <Typography variant="caption" className={classes.europeanTitle}>
            {t('navigation.fundedByHorizon')}
          </Typography>
        </div>

        <div className={classes.logosWrapper}>
          <a href="https://sunshineplatform.eu" target="_blank" rel="noopener noreferrer">
            <img src={logoBannerIMG} alt="Sunshine" />
          </a>
          <a href="https://fineergodom.eu/" target="_blank" rel="noopener noreferrer">
            <img src={finEERGoDomIMG} alt="fineergodom" />
          </a>
        </div>

        {(myOrganizationsNumber || myProjectsNumber) && (
          <CreateMeetingMenu
            organization={organization}
            project={project}
            onClick={setMeetingDialogType}
          />
        )}

        <div className="row center-xs">
          <PopUp termsofservice={true} label={t('auth.terms')} />
        </div>
        <div className="row center-xs">
          <PrivacyPolicyDialog />
          <div className={classes.verticalSeparator} />
          <GDPRDialog />
          <div className={classes.verticalSeparator} />
          <div className="secondary-redirect" onClick={toggleCountryAdminDialog}>
            {t('navigation.contacts')}
          </div>

          {countryAdminDialogOpen && (
            <CountryRolesDialog
              title={t('platformRoles.dataProtectionOfficers')}
              role="data_protection_officer"
              onClose={toggleCountryAdminDialog}
            />
          )}
        </div>
      </div>

      <MeetingTypeDialog
        open={Boolean(meetingDialogType) && !meetingTypeValue}
        onClose={() => setMeetingDialogType(null)}
        onChange={(v) => {
          setMeetingTypeValue(v);
        }}
        type={meetingDialogType}
        organizations={organization.myOrganizations?.filter(o => !isResidentsCommunity(o.data.legal_form))}
        projects={project.myProjects}
      />
      {meetingTypeValue && (
        <MeetingRegister
          host={meetingTypeValue?.organization?.id}
          organization={meetingTypeValue?.organization}
          project={meetingTypeValue?.project?.id}
          open={Boolean(meetingTypeValue)}
          myOrgs={organization.myOrganizations}
          handleClose={() => { setMeetingDialogType(null); setMeetingTypeValue(null); }}
        />
      )}
    </React.Fragment>
  );
}

function CreateMeetingMenu(props) {
  const { onClick } = props;

  const classes = useStyles();
  const { t } = useTranslation('translations');
  const [open, setOpen] = useState(false); // eslint-disable-line no-shadow

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <SpeedDial
      ariaLabel="Create meeting menu"
      className={classes.createMeetingDial}
      icon={<React.Fragment><SpeedDialIcon />{t('navigation.createMeeting')}</React.Fragment>}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      direction="up"
    >
      <SpeedDialAction
        icon={
          <span className="SpeedDialAction">
            <OrganizationIcon />
            <span>{t('notifications.single.organization')}</span>
          </span>
        }
        tooltipTitle={t('meetings.createOrganizationMeeting')}
        onClick={() => {
          onClick('organization');
          handleClose();
        }}
      />
      <SpeedDialAction
        icon={
          <span className="SpeedDialAction">
            <ProjectIcon />
            <span>{t('notifications.single.project')}</span>
          </span>
        }
        tooltipTitle={t('meetings.createProjectMeeting')}
        onClick={() => {
          onClick('project');
          handleClose();
        }}
      />
    </SpeedDial>
  );
}

function MeetingTypeDialog(props) {
  const {
    type,
    open, // eslint-disable-line no-shadow
    organizations,
    projects,
    onChange,
    onClose,
  } = props;

  const { t } = useTranslation('translations');

  const [selectedResult, setSelectedResult] = useState(null);

  if (!projects || !organizations || !type) {
    return null;
  }

  let entities = [];
  let inputLabelKey = '';
  let dialogTitleKey = '';
  switch (type) {
    case 'organization':
      entities = organizations;
      inputLabelKey = 'utils.searchAndSelectOrganization';
      dialogTitleKey = 'organizations.nameOfOrganization';
      break;
    case 'project':
      entities = projects;
      inputLabelKey = 'utils.searchAndSelectProject';
      dialogTitleKey = 'transitionRequests.projectName';
      break;
    default:
      return null;
  }

  const handleClose = () => { setSelectedResult(null); onClose(); };
  const handleChange = () => { setSelectedResult(null); onChange(selectedResult); };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {t(dialogTitleKey)}
      </DialogTitle>
      <DialogContent>
        <Input
          label={t(inputLabelKey)}
          value={selectedResult?.[type].id}
          search
          options={entities.map(o => ({ value: o._id, label: o.data.name }))}
          onChange={(params) => {
            if (type === 'organization') {
              setSelectedResult({ organization: { id: params.value, name: params.label } });
              return;
            }
            if (type === 'project') {
              const p = entities.find(e => e._id === params.value);
              setSelectedResult({
                project: { id: params.value, name: params.label },
                organization: { id: p?.data.owner._id, name: p?.data.owner.data.name },
              });
              return;
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color="inherit"
          onClick={handleClose}
        >
          {t('utils.confirmDialogCancel')}
        </Button>
        <Button
          color="primary"
          variant="contained"
          disabled={!selectedResult}
          onClick={handleChange}
        >
          {t('navigation.ok')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

NavigationDrawer.propTypes = {
  mobileOpen: PropTypes.bool.isRequired,
  onMobileClose: PropTypes.func,
};

NavigationDrawer.defualtProps = {
  mobileOpen: false,
};

export default connect(
  state => ({
    user: state.user,
    organization: state.organization,
    project: state.project,
  }),
  dispatch => ({
    getMyOrganizations: (userID, isMine, offset = 0, limit = null) => dispatch(getMyOrganizationsAction(userID, isMine, offset, limit)),
    getMyProjects: (userID, isMine, offset = 0, limit = null) => dispatch(getMyProjectsAction(userID, isMine, offset, limit)),
  })
)(NavigationDrawer);
