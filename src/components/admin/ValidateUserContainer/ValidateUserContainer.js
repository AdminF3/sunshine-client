import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import ENDPOINTS from '../../../constants/endpoints';
import defaultImage from './../../../images/Profile_avatar_placeholder_large.png';

import styles from './styles';

class ValidateUserContainer extends React.Component {
  constructor() {
    super()
    this.state = { value: 1 };
  }

  handleChange = (event, index, value) => this.setState({value});

  render(){
    const { classes } = this.props;
    let allUsers;
    this.props.allUsers ? allUsers = this.props.allUsers : allUsers = [];

    const Validated = ({ classes, valid }) => {
      let className = {},
          textInside = ''
      switch(valid) {
        case 1 : className = classes.validStyle
          textInside = 'Valid'
          break;
        case 2 : className = classes.declinedStyle
          textInside = 'Declined'
          break;
        case 3 : className = classes.pendingStyle
          textInside = 'Pending'
          break;
        case 4 : className = classes.registeredStyle
          textInside = 'Registered'
          break;
        default : break
      }
      return (
      <div>
        <div className={className}>
          {textInside}
        </div>
      </div>
    )}

    return(
      <div className={ classes.containerStyle}>
        <div className={`row ${classes.headerStyle}`}>
          <div className={`col-xs-6 col-sm-6 col-md-4 col-lg-3 ${classes.headerTextStyle}`}>
            Name
          </div>
          <div className={`col-xs-3 ${classes.headerColumTextStyleEmail}`}>
            Valid Email
          </div>
          <div className={`col-xs-3 ${classes.headerColumTextStylePhone}`}>
            Phone
          </div>
          <div className={`col-xs-6 col-sm-6 col-md-4 col-lg-3 ${classes.headerTextStyle}`}>
            Validation Status
          </div>
        </div>
        {allUsers.documents && allUsers.documents.map((user, index) => {
          return (
            <Link key={index} to={'/user/' + user._id} style={{ textDecoration: 'none' }}>
              <div className={`row ${classes.rowStyle}`}>
                <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3">
                  <Avatar
                    size={40}
                    className={ classes.profileAvatar }
                    src={user.data.avatar
                      ? ENDPOINTS.SERVER + user.data.avatar
                      : defaultImage}
                  />
                  <span className={ classes.nameStyleObj }>{user.data.name}</span>
                </div>
                <div className={`col-xs-3 ${classes.rowColumTextStyleEmail}`}>
                  {user.data.email}
                </div>
                <div className={`col-xs-3 ${classes.rowColumTextStylePhone}`}>
                  {user.data.phone ? user.data.phone : 'N/A'}
                </div>
                <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3">
                  <Validated valid={user.data.valid ? user.data.valid : 3} classes={classes} />
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    )
  }
}

export default withStyles(styles)(ValidateUserContainer);
