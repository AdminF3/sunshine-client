export default {
  root: {
    boxShadow: 'none',
  },
  infoContainer: {
    padding: '0 10px',
    marginTop: -20
  },
  rowContnent: {
    padding: 10,
  },
  subTitle: {
    fontSize: 12,
    marginTop: 5,
    color: 'rgba(0, 0, 0, 0.54)',
  },
  title: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '20px',
    minHeight: 20,
    textAlign: 'left',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  nopadding: {
    padding: '0px !important',
  },
  nameContent: {
    marginLeft: 10,
    maxWidth: 165,
    marginRight: 'auto',
  },
  contractTerms: {
    marginLeft: 40,
  },
  firstYearContract: {
    marginLeft: 40,
    marginRight: 30,
  },
  projectCardInfoBoxElement: {
    maxWidth: 130,
    borderRadius: 2.4,
    margin: 'auto',
    marginBottom: 10,
  },
  addingButtonStyle: {
    padding: 0,
    width: 40,
    height: 40,
    borderRadius: '50%',
    border: '1px solid #E7EAEE',
    backgroundColor: '#F8FAFC',
    right: '-90%',
    bottom: 205,
    position: 'relative',
    '@media screen and (max-width: 500px)': {
      right: '-85%',
    },
    '@media screen and (max-width: 300px)': {
      right: '-80%',
    },
  },
  prjCardValid: {
    color: '#ffffff',
    borderRadius: 4,
    backgroundColor: '#45B854',
    padding: 2,
    fontSize: 14,
    width: 50,
    textAlign: 'center',
    bottom: -11,
    right: -10,
    position: 'relative',
  },
  prjCardInvalid: {
    width: 111,
    borderRadius: 4,
    backgroundColor: '#fec007',
    color: '#ffffff',
    padding: 2,
    fontSize: 14,
    textAlign: 'center',
    top: -35,
    right: -10,
    position: 'relative',
  },
  prjCardBaseOverview: {
    height: '100%',
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#ffffff',
    border: 'solid 1px #dfe2e5',
  },
  objectFitFill: {
    height: 120,
    width: '100%',
    objectFit: 'cover',
  },
  objectFitFillPrivate: {
    height: 210,
    width: '100%',
    objectFit: 'cover',
  },
  prjCardBasePrjsList: {
    height: 325,
    maxHeight: 350,
    width: 290,
    border: '1px solid #DFE2E5',
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    margin: '30px 0px 8px 0px',
    userSelect: 'none',
    boxShadow: '',
    '&:hover': {
      boxShadow: '0px 3px 21px 0px rgba(0, 0, 0, 0.4) !important',
    },
  },
  cardContentName: {
    marginBottom: 5,
    color: '#354052',
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '20px',
    width: 243,
    padding: 16,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  cardContentProjectOwner: {
    float: 'right',
    fontSize: 14,
    fontWeight: 600,
    padding: 5,
    lineHeight: '36px',
    height: 36,
  },
  cardContentText: {
    float: 'right',
    fontSize: 14,
    fontWeight: 600,
    padding: '5px !important',
    lineHeight: '47px',
    overflow: 'hidden',
    textAlign: 'right',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '75%',
    marginRight: 10,
    color: '#000000',
  },
  cardContentTitle: {
    fontWeight: 600,
    padding: '5px !important',
    lineHeight: '47px',
    fontSize: 12,
    display: 'inline-flex',
    color: '#7f8fa4',
    alignItems: 'center',
  },
  prjListTitles: {
    width: '100%',
    marginTop: -21,
  },
  prjCardBoxLabel: {
    marginBottom: 15,
    height: 54,
    fontSize: 16,
    fontWeight: 600,
    textAlign: 'center',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prjCardBoxText: {
    color: '#354052',
    height: 60,
    fontSize: 11,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  noPaddingNoMargin: {
    margin: 0,
    padding: 0,
  },
  pendingStyle: {
    color: '#ffffff',
    borderRadius: 4,
    backgroundColor: '#F7981C',
    padding: 2,
    fontSize: 14,
    textAlign: 'center',
    top: -35,
    right: -10,
    position: 'relative',
  },
  validStyle: {
    color: '#ffffff',
    borderRadius: 4,
    backgroundColor: '#45B854',
    padding: 2,
    fontSize: 14,
    textAlign: 'center',
    top: -35,
    right: -10,
    position: 'relative',
  },
  declinedStyle: {
    color: '#ffffff',
    borderRadius: 4,
    backgroundColor: '#ff0000',
    padding: 2,
    fontSize: 14,
    textAlign: 'center',
    top: -35,
    right: -10,
    position: 'relative',
  },
  registeredStyle: {
    color: '#ffffff',
    borderRadius: 4,
    backgroundColor: '#3366ff',
    padding: 2,
    fontSize: 14,
    textAlign: 'center',
    top: -35,
    right: -10,
    position: 'relative',
  },
  metricTitle: {
    fontSize: 15,
    color: '#7f8fa4',
    margin: '15px 0',
    display: 'inline-flex',
    alignItems: 'center',
  },
  forfaitingContainer: {
    marginBottom: 10
  },
  forfaitingInfoTitle: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 16,
    fontSize: 15,
    color: '#7f8fa4',
  },
  forfaitingInfoText: {
    paddingLeft: 16
  }
};
