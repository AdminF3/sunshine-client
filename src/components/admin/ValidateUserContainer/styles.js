export default theme => ({
  containerStyle: {
    marginTop: '30px',
    marginBottom: '30px',
    border: '1.09px solid #DFE2E5',
    borderRadius: '4.34px',
    backgroundColor: '#FFFFFF',
    minWidth: '300px',
    overflow: 'auto',
    '@media screen and (max-width: 960px)': {
      marginLeft: '10px',
      marginRight: '10px',
      padding: '0px'
    }
  },
  headerStyle: {
    alignItems: 'center',
    paddingLeft: '10px',
    height: '55px',
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
    backgroundColor: '#FFFFFF'
  },
  headerTextStyle: {
    color: '#7f8fa4',
    fontSize: '14px',
    textAlign: 'center',
    fontWeight: '600',
  },
  rowStyle: {
    height: '55px',
    paddingLeft: '10px',
    alignItems: 'center',
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
    fontSize: '14px',
    fontWeight: '600',
    color: '#354052',
    '&:hover':{
      backgroundColor: '#f2f2f2'
    }
  },
  nameStyleObj: {
    position: 'relative',
    bottom:'14px',
    fontSize: '14px',
    color: '#354052',
    '@media screen and (max-width: 400px)': {
      bottom: "auto",
    }
  },
  pendingStyle: {
    color: '#ffffff',
    borderRadius: '4px',
    backgroundColor: '#F7981C',
    padding: '2px',
    width:'68px',
    textAlign: 'center',
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  validStyle: {
    color: '#ffffff',
    borderRadius: '4px',
    backgroundColor: '#45B854',
    padding: '2px',
    width:'68px',
    textAlign: 'center',
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  declinedStyle: {
    color: '#ffffff',
    borderRadius: '4px',
    backgroundColor: '#ff0000',
    padding: '2px',
    width:'68px',
    textAlign: 'center',
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  registeredStyle: {
    color: '#ffffff',
    borderRadius: '4px',
    backgroundColor: '#3366ff',
    padding: '2px',
    width:'68px',
    textAlign: 'center',
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  headerColumTextStylePhone: {
    color: '#7f8fa4',
    fontSize: '14px',
    textAlign: 'center',
    fontWeight: '600',
    '@media screen and (max-width: 1200px)': {
      display: 'none'
    }
  },
  rowColumTextStylePhone: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#354052',
    textAlign: 'center',
    '@media screen and (max-width: 1200px)': {
      display: 'none'
    }
  },
  headerColumTextStyleEmail: {
    color: '#7f8fa4',
    fontSize: '14px',
    textAlign: 'center',
    fontWeight: '600',
    '@media screen and (max-width: 1024px)': {
      display: 'none'
    }
  },
  rowColumTextStyleEmail: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#354052',
    textAlign: 'center',
    '@media screen and (max-width: 1024px)': {
      display: 'none'
    }
  },
  profileAvatar: {
    marginRight: '10px',
    marginTop: '5px',
    display: 'inline-block',
    backgroundColor: '#BBBBBB',
    '@media screen and (max-width: 400px)': {
      display: 'none'
    }
  },
})
