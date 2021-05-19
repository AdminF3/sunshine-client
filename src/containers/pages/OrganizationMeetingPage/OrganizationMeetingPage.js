import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";
import NavContainer from './../../smartcomponents/navcontainer';

import SnackbarNotification from './../../smartcomponents/SnackbarNotification';
import OrganizationMeetingViewWrapper from '../../../components/organization/OrganizationMeetings/OrganizationMeetingViewWrapper/OrganizationMeetingViewWrapper';

class OrganizationMeetingPage extends Component { 
    render(){
        const { alerts } = this.props;
        
        return(
            <div style={{ height: '100%' }}>
                <Helmet title='Energy Service Companies | SUNShINE'/>
                <NavContainer formName='profileUpdate'/>

                <div>   
                    {alerts && alerts.map((alert, index) => (
                        <SnackbarNotification open alert={alert} key={index}/>
                    ))}
                    <OrganizationMeetingViewWrapper />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        alerts: state.alerts.pending,
    };
};

export default connect(mapStateToProps, '')(OrganizationMeetingPage);