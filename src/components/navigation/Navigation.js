import React from 'react';
import PropTypes from 'prop-types';

// WRAPPERS
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

// COMPONENTS
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ChangePassword from '../user/ChangePassword/ChangePassword';
import SelectLanguage from '../utils/SelectLanguage';

// ICONS
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/KeyboardArrowDown';
import defaultImage from './../../images/Profile_avatar_placeholder_large.png';
import toggleLanguage from '../../actions/language';

// BACKEND ENDPOINTS
import ENDPOINTS from '../../constants/endpoints';

import styles from './styles';
import Notifications from '../utils/Notifications/Notifications';
import NavigationDrawer from './NavigationDrawer';

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
    anchorEl: null,
    open: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handlePasswordOpen = () => {
    this.setState({ open: true });
  };

  handlePasswordClose = () => {
    this.setState({ open: false });
  };

  handleLogOut = () => this.props.logout(() => this.props.history.push('/login'))

  render() {
    const { anchorEl } = this.state;
    const { classes, userdata, logged, t,
      changePassword, passwordChanged, toggleLanguage, language } = this.props;
    // This will be shown only if the user is logged in.
    const loggedMenu = (
      <div className={classes.loggedUserIconMenu}>
        <SelectLanguage toggleLanguage={toggleLanguage} lang={language} />
        <Notifications />
        <div className={classes.userName}>
          {userdata.data && userdata.data.name}
        </div>
        {userdata
          ? logged && userdata && userdata.data.avatar
            ? <Avatar
              className={classes.avatar}
              src={ENDPOINTS.SERVER + userdata.data.avatar}>
            </Avatar>
            : <Avatar
              className={classes.avatar}
              src={defaultImage}>
            </Avatar>
          : null}
        <IconButton
          onClick={this.handleClick}
          className={classes.iconButton}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <Link to='/profile' className={classes.textDecorationNone}>
            <MenuItem onClick={this.handleClose}>{t('translations:profile.profile')}</MenuItem>
          </Link>
          <MenuItem onClick={() => {
            this.handlePasswordOpen();
            this.handleClose();
          }}>
            <div className={classes.changePasswordLabel}>
              {t('translations:profile.changePassword')}
            </div>
          </MenuItem>
          <MenuItem onClick={this.handleLogOut}>{t('translations:profile.signOut')}</MenuItem>
        </Menu>
      </div>
    );

    const authMenu = (
      <div className={classes.authMenuOuterContainer}>
        <SelectLanguage toggleLanguage={toggleLanguage} lang={language} />
        <div className={`row center-xs ${classes.authMenuInnerContainer}`}>
          <div className={classes.arrowIconStyle}>&#8594;</div>
          <Link to='/login' className={classes.linkTextStyle}>{t('translations:auth.login')}</Link>
          <div className={classes.verticalDivider}>|</div>
          <Link to='/register' className={classes.linkTextStyle}>{t('translations:auth.register')}</Link>
        </div>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar
            classes={{
              root: classes.toolBarMobile
            }}
          >
            <IconButton
              color="inherit"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            {logged && document.cookie.length > 0 ? loggedMenu : authMenu}
          </Toolbar>
          <ChangePassword handleFormSubmit={changePassword} passwordChanged={passwordChanged} t={t} open={this.state.open} handlePasswordClose={this.handlePasswordClose} />
        </AppBar>

        <NavigationDrawer
          mobileOpen={this.state.mobileOpen}
          onMobileClose={this.handleDrawerToggle}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.user.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleLanguage: (lang) => {
      dispatch(toggleLanguage(lang));
    }
  };
};

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  logout: PropTypes.func,
  lang: PropTypes.string,
  toggleLanguage: PropTypes.func,
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(withTranslation('translations')(ResponsiveDrawer))));
