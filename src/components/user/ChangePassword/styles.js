export default theme => ({
  inputStyle: {
    height: '36px',
    width: '100%',
    border: '1px solid #E6EAEE',
    borderRadius: '4px',
    backgroundColor: '#FFFFFF',
    padding: '5px 10px 5px 10px',
    textAlign: 'center',
    display: 'flex',
    margin: 'auto auto 15px',
    WebkitTextSecurity: 'disc',
    '&:focus': {
      outline: 'none',
      border:'1px solid #4D90FE !important',
      boxShadow:' 0px 0px 5px  #4D90FE !important'
    }
  },
  buttonStyle: {
    marginTop: '30px',
    marginBottom: '20px',
    marginRight: '0px',
    backgroundColor: '#ffeb3b',
    padding: '0px 20px',
  },
  authLabel: {
  	color: '#7F8FA4',
  	fontSize: '14px',
  	fontWeight: '600',
  	lineHeight: '19px',
  },
  authError: {
    marginTop: '5px',
    color: '#B33A3A',
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '19px',
    textAlign: 'center',
    height: '10px',
  },
  authWarning: {
    marginTop: '5px',
    color: '#FF9900',
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '19px',
  },
  successfullyChangedPasswordContainer: {
    padding: '25px',
    textAlign: 'center',
  },
  successfullyChangedPasswordText: {
    color: '#7F8FA4',
  	fontSize: '18px',
  },
  checkCircleIcon: {
    color: '#4CAF50',
    fontSize: '40px',
    margin: '10px',
  },
});
