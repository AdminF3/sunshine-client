import React from 'react';
import { reduxForm } from 'redux-form';
import ReactGA from 'react-ga';

class IndoorClimaWrapper extends React.Component {

  render() {
    const {
      handleSubmit,
      handleFormSubmit,
      child,
      style,
      projectId
    } = this.props;

    const handleFinish = (formData) => {
      ReactGA.event({
        category: 'Super user / Lear',
        action: 'Indoor clima',
        label: 'Update indoor clima table',
      });
      handleFormSubmit(formData, projectId);
    };

    return (
      <div style={style}>
        <form onSubmit={handleSubmit(handleFinish.bind(this))}>
          { child }
        </form>
      </div>
    );
  }
}

export default (reduxForm({
  form: 'IndoorClimaWrapper'
})(IndoorClimaWrapper));
