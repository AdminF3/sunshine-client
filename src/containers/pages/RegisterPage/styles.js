export default theme => ({
  container: {
    marginTop: '80px',
  },
  loginBase: {
    minHeight: '437px',
    width: '450px',
    borderRadius: '0 4px 4px 0',
    backgroundColor: '#FFFFFF',
  },
  centeredLogo: {
    height: '100px !important',
    width: '100px !important',
    left: '50%',
    borderRadius: '100%',
    position: 'relative',
    float: 'left',
    transform: 'translate(-50%, -50%)',
  },
  avatarStyle: {
    width: '100px',
    height: '100px',
    backgroundColor: '#ffffff',
    padding: '5px'
  },
  formHeading: {
    color: '#354052',
    fontSize: '26px',
    lineHeight: '32px',
    marginTop: '75px',
    right: '50px',
    position: 'relative',
    '@media screen and (max-width: 370px)': {
      fontSize: '21px',
    },
  },
})
