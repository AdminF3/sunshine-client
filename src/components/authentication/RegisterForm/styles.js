export default theme => ({
  registerButton: {
    backgroundColor: '#ffeb3b',
    marginTop: '40px',
    marginBottom: '30px',
    padding: '0px',
    '&:hover': {
      backgroundColor: '#c7d117',
    },
  },
  label: {
    alignItems: 'flex-end',
  },
  formStyle: {
    display: 'inline-block',
    textAlign: 'center',
    alignContent: 'center',
    marginLeft: '40px',
    marginRight: '40px',
  },
  primaryRedirect: {
    color: '#BBBDBF',
    fontSize: '14px',
    fontWeight: 'bold',
    lineHeight: '19px',
    textAlign: 'center',
    textDecoration: 'none',
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
  authError: {
    marginTop: '5px',
    color: '#B33A3A',
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '19px',
    textAlign: "center",
    marginBottom: '5px',
  },
  authWarning: {
    marginTop: '5px',
    color: '#FF9900',
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '19px',
  },
});
