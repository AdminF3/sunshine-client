export default theme => ({
  upperHeaderStyle: {
    fontSize: '20px',
    fontWeight: '600',
    textAlign: 'center',
    color: '#7f8fa4',
    background: 'linear-gradient(0deg, #F4F7FA 0%, #FFFFFF 100%)',
    border: '1px solid #dfe2e5',
    padding: '0px !important',
    height: '51px',
    '@media screen and (maxWidth: 960px)': {
      fontSize: '14px',
    }
  },
  headersStyle: {
    fontWeight: '600',
    textAlign: 'center',
    color: '#7f8fa4',
    background: 'linear-gradient(0deg, #F4F7FA 0%, #FFFFFF 100%)',
    border: '1px solid #dfe2e5',
    padding: '0px !important',
    height: '51px',
    '@media screen and (maxWidth: 960px)': {
      fontSize: '10px',
    }
  },
  innerHeadersStyle: {
    fontWeight: '600',
    textAlign: 'center',
    color: '#7f8fa4',
    background: 'linear-gradient(0deg, #F4F7FA 0%, #FFFFFF 100%)',
    border: '1px solid #dfe2e5',
    padding: '0px !important',
    height: '51px',
    fontSize: '14px',
    '@media screen and (maxWidth: 960px)': {
      fontSize: '10px',
    }
  },
  tableRowInput: {
    fontSize: '16px',
    fontWeight: '600',
    textAlign: 'center',
    whiteSpace: 'unset',
    overflow: 'hidden',
    marginTop: '10px',
    border: '1px solid #dfe2e5',
    padding: '0px',
    height: '51px',
    '@media screen and (maxWidth: 960px)': {
      fontSize: '10px',
    }
  },
  titleStyle: {
    fontSize: '18px',
    fontWeight: '600',
    textAlign: 'center',
    color: '#7f8fa4',
    background: 'linear-gradient(0deg, #F4F7FA 0%, #FFFFFF 100%)',
    border: '1px solid #dfe2e5',
    padding: '0px !important',
    paddingLeft: '20px',
    paddingRight: '20px',
    height: '51px',
    '@media screen and (maxWidth: 960px)': {
      fontSize: '12px',
    }
  },
  saveButton: {
    backgroundColor: '#ffeb3b',
    float:'right',
    position: 'relative',
    '&:hover': {
      backgroundColor: '#c7d117',
    },
  },
  prjTableInputField: {
    width: '100%',
    minHeight: '51px',
    maxHeight: '147px',
    border: '1px',
    textAlign: 'center',
    padding: 0,
    margin: 0,
  },
  tableStyle: {
    borderCollapse: 'collapse !important',
    marginBottom: '40px',
  },
})
