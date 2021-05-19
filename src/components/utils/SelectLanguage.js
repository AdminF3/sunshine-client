import React from 'react';
import PropTypes from 'prop-types';

import { withTranslation } from 'react-i18next';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import { LV, EN, BG, SK, AT, RO, PL } from './SVGflags';

class SelectLanguage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    let { toggleLanguage, lang } = this.props;

    const handleSelect = (lng) => {
      this.handleRequestClose();
      toggleLanguage(lng);
    }
    const langNode = () => {
      if (lang.includes('en'))
        return (<EN width={21} height={21} padding={0} />)
      else if (lang.includes('lv'))
        return (<LV width={21} height={21} padding={0} />);
      else if (lang.includes('bg'))
        return (<BG width={21} height={21} padding={0} />);
      else if (lang.includes('sk'))
        return (<SK width={21} height={21} padding={0} />);
      else if (lang.includes('at'))
        return (<AT width={21} height={21} padding={0} />);
      else if (lang.includes('ro'))
        return (<RO width={21} height={21} padding={0} />);
      else if (lang.includes('pl'))
        return (<PL width={21} height={21} padding={0} />);
    }

    return (
      <div style={{ height: 45, width: 45, margin: 'auto' }}>
        <IconButton
         tooltip="Language"
         onClick={this.handleTouchTap}
        >
          {lang && langNode()}
        </IconButton>
        <Menu
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          onClose={this.handleRequestClose}
        >
          <MenuItem onClick={() => handleSelect("bg")}>
            <ListItemIcon>
              <BG width={21} height={21} padding={0} />
            </ListItemIcon>
            Bulgarian
          </MenuItem>
          <MenuItem onClick={() => handleSelect("en")}>
            <ListItemIcon>
              <EN width={21} height={21} padding={0} />
            </ListItemIcon>
            English
          </MenuItem>
          <MenuItem onClick={() => handleSelect("lv")}>
            <ListItemIcon>
              <LV width={21} height={21} padding={0} />
            </ListItemIcon>
            Latvian
          </MenuItem>
          <MenuItem onClick={() => handleSelect("sk")}>
            <ListItemIcon>
              <SK width={21} height={21} padding={0} />
            </ListItemIcon>
            Slovak
          </MenuItem>
          <MenuItem onClick={() => handleSelect("at")}>
            <ListItemIcon>
              <AT width={21} height={21} padding={0} />
            </ListItemIcon>
            Austrian
          </MenuItem>
          <MenuItem onClick={() => handleSelect("ro")}>
            <ListItemIcon>
              <RO width={21} height={21} padding={0} />
            </ListItemIcon>
            Romanian
          </MenuItem>
          <MenuItem onClick={() => handleSelect("pl")}>
            <ListItemIcon>
              <PL width={21} height={21} padding={0} />
            </ListItemIcon>
            Polish
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

SelectLanguage.propTypes = {
  toggleLanguage: PropTypes.func.isRequired,
  lang: PropTypes.string
};

export default withTranslation('translations')(SelectLanguage);
