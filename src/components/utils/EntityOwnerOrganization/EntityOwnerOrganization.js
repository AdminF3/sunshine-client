import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';
import ENDPOINTS from './../../../constants/endpoints';
// import { legalForms } from './../../../constants/legalStatusTypes';
import testlogo from './../../../images/Sunshine-Logo-FB1200x627.png';

import styles from './styles';

class ProjectOwnerOrganization extends Component {

  render() {
    const { classes, owner, title } = this.props;

    return(
      <Link to={'/organization/' + owner._id} style={{ textDecoration: 'none' }}>
        <div className={ classes.innerContainer }>
          <div className={ classes.title }>
            {title}
          </div>
          <div className='row' style={{ width: '100%', height: '240px' }}>
            <div className={ classes.imageContainer }>
              <img alt='organization logo' src={owner.data.logo ? ENDPOINTS.SERVER + owner.data.logo : testlogo} className={ classes.image }/>
            </div>
          </div>
        </div>
      </Link>
    )
  }
}

export default withStyles(styles)(ProjectOwnerOrganization);
