import React from 'react';

class DimensionWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth
    };

  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  handleResize = () => {
     this.setState({width: this.wrapper.offsetWidth});
  }

  render() {

    let { width } = this.state;
    const childrenWithExtraProp = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        wrapperWidth: width
      });
    });
    return (
      <div ref={el => this.wrapper = el}>
        {childrenWithExtraProp}
      </div>
    );
  }
}

export default DimensionWrapper
