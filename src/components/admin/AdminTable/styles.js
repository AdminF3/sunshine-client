export default {
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
    marginLeft: '20px',
    marginRight: '20px',
    border: '2px solid #dfe2e5',
    backgroundColor: '#FFFFFF',
  },
  container: {
    overflow: 'auto',
    height: 'calc(100% - 40px)',
  },
  headerStyle: {
    borderBottom: '2px solid rgba(0, 0, 0, 0.12)'
  },
  headerNameStyle: {
    color: '#7f8fa4',
    fontSize: '20px',
    textAlign: 'left',
    fontWeight: '600',
    padding: '20px',
  },
  headerStatusStyle: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    color: '#7f8fa4',
    fontSize: '16px',
    fontWeight: '600',
    padding: '20px',
  },
  rowStyle: {
    borderBottom: '2px solid #dfe2e5',
  },
  rowContentStyle: {
    color: '#000000',
    fontSize: '18px',
    textAlign: 'left',
    padding: '20px',
  },
  pendingStyle: {
    color: '#ffffff',
    borderRadius: '4px',
    backgroundColor: '#F7981C',
    padding: '2px',
    width: '78px',
    textAlign: 'center',
    position: 'relative',
    marginLeft: 'auto',
    marginRight: '20px',
  },
  validStyle: {
    color: '#ffffff',
    borderRadius: '4px',
    backgroundColor: '#45B854',
    padding: '2px',
    width: '78px',
    textAlign: 'center',
    position: 'relative',
    marginLeft: 'auto',
    marginRight: '20px',
  },
  declinedStyle: {
    color: '#ffffff',
    borderRadius: '4px',
    backgroundColor: '#ff0000',
    padding: '2px',
    width: '78px',
    textAlign: 'center',
    position: 'relative',
    marginLeft: 'auto',
    marginRight: '20px',
  },
  registeredStyle: {
    color: '#ffffff',
    borderRadius: '4px',
    backgroundColor: '#3366ff',
    padding: '2px',
    width: '78px',
    textAlign: 'center',
    position: 'relative',
    marginLeft: 'auto',
    marginRight: '20px',
  },
  noResultsStyle: {
    width: '202px',
    fontSize: '18px',
    margin: '30px auto',
    color: '#7f8fa4',
  },
  verified: {
    color: 'gold',
  },
  nonVerified: {
    color: 'silver'
  },
  userCountry: {
    display: 'inline-flex',
    '& > img': {
      marginLeft: 8,
    }
  },
  rowDisabled: {
    cursor: 'not-allowed',
  },
};
