import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { confirmUser } from '../../../actions/authentication';

class ConfirmUser extends React.Component {

    UNSAFE_componentWillMount() {
        const { confirmUser } = this.props;

        confirmUser(window.location.pathname, () => this.props.history.push('/login'));
    }

    render() {
        return (
            <div></div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        confirmUser: (pathname, redirect) => {
            dispatch(confirmUser(pathname, redirect));
        }
    };
};

export default connect('', mapDispatchToProps)(withRouter(ConfirmUser));