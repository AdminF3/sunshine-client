import React from 'react';
import { reduxForm } from 'redux-form';
import ReactGA from 'react-ga';

class AnnexWrapper extends React.Component {
  componentDidMount() {
    this.props.initialize(this.props.initialValues);
  }
  render() {
    const {
      handleSubmit,
      handleFormSubmit,
      data,
      style,
      projectId
    } = this.props;
    const handleFinish = (formData) => {
      ReactGA.event({
        category: 'Super user / Lear',
        action: 'Annex',
        label: 'Update annex information',
      });
      handleFormSubmit(formData, projectId);
    };

    return (
      <div style={style}>
        <form onSubmit={handleSubmit(handleFinish.bind(this))}>
          {data}
        </form>
      </div>
    );
  }
}

export default (reduxForm({
  form: 'AnnexWrapper'
})(AnnexWrapper));
