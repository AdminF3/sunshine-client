export default theme => ({
  inputStyle: {
    height: '36px',
    width: '245px',
    border: '1px solid #E6EAEE',
    borderRadius: '4px',
    backgroundColor: '#FFFFFF',
    padding: '5px 10px 5px 10px',
    textAlign: 'center',
    display: 'flex',
    margin: '10px auto 15px',
    WebkitTextSecurity: 'disc',
    '&:focus': {
      outline: 'none',
      border:'1px solid #4D90FE !important',
      boxShadow:' 0px 0px 5px  #4D90FE !important'
    }
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
    textAlign: "center",
    marginBottom: '5px',
    height: '10px'
  },
  authWarning: {
    marginTop: '5px',
    color: '#FF9900',
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '19px',
  },
  profileUpdateButton: {
    marginTop: '40px',
    marginRight: '10px !important',
    backgroundColor: '#ffeb3b',
    padding: '0px 20px',
    marginBottom: '20px',
  }
});
