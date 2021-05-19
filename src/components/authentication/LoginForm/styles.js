export default theme => ({
  loginButton: {
    marginTop: '25px',
    marginBottom: '30px',
    padding: '0px',
    backgroundColor: '#ffeb3b',
    '&:hover': {
      backgroundColor: '#c7d117',
    },
  },
  formStyle: {
    display: 'inline-block',
    textAlign: 'center',
    alignContent: 'center',
  },
  authLabel: {
    color: '#7F8FA4',
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '19px',
  },
  specialInput: {
    height: '36px',
    width: '370px',
    border: '1px solid #DFE3E9',
    borderRadius: '4px',
    backgroundColor: '#F8FAFC',
    '@media screen and (max-width: 700px)': {
      width: '290px',
    },
    '@media screen and (max-width: 320px)': {
      width: '260px'
    },
    '&:focus': {
      outline: 'none',
      border:'1px solid #4D90FE !important',
      boxShadow:' 0px 0px 5px  #4D90FE !important'
    }
  },
  primaryRedirect: {
    color: '#BBBDBF',
    fontSize: '14px',
    fontWeight: 'bold',
    lineHeight: '19px',
    textAlign: 'center',
    textDecoration: 'none',
  },
});
