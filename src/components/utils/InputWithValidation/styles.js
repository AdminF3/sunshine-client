export default theme => ({
  assetRegisterPlaceholderIcon: {
  	position: 'relative',
  	float: 'right',
  	transform: 'translate(-100%, -100%)',
  	top: '27px',
  	right: '15px',
  },
  orgRegister1Headline: {
    textAlign: 'center',
    color: '#354052',
    fontSize: '16px',
    fontWeight: '600',
    lineHeight: '20px',
    marginBottom: '10px',
  },
  orgRegister1Input: {
    height: '36px',
    width: '245px',
    border: '1px solid #E6EAEE',
    borderRadius: '4px',
    backgroundColor: '#FFFFFF',
    padding: '5px 10px 5px 10px',
    textAlign: 'center',
    display: 'flex',
    margin: 'auto',
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
})
