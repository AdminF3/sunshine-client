export default theme => ({
  innerClass: {
    margin: '20px auto',
    display: 'flex',
    padding: 0,
    boxShadow: '0px 2px 13px 0px rgba(0, 0, 0, 0.4) !important',
    borderRadius: '30px',
  },
  itemClass: {
    listStyleType: 'none',
    backgroundColor: '#FFFFFF',
    height: '40px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'whitesmoke'
    },
  },
  linkClass: {
    color: '#000000',
    paddingRight: '15px',
    paddingLeft: '15px',
    fontSize: '17px',
    textDecoration: 'none',
    top: '8px',
    position: 'relative',
  },
  activeClass: {
    backgroundColor: 'gainsboro',
    '&:hover': {
      backgroundColor: 'gainsboro'
    },
  },
  activeLinkClass: {
    color: 'black',
  },
  itemClassFirst: {
    borderTopLeftRadius: '30px',
    borderBottomLeftRadius: '30px',
  },
  itemClassLast: {
    borderTopRightRadius: '30px',
    borderBottomRightRadius: '30px',
  },
  searchAndFilterContainer: {
    position: 'fixed',
    top: '70px',
    zIndex: 1,
    width: '100%',
    '@media screen and (min-width: 960px)': {
      width: 'calc(100% - 250px)',
    },
  },
  cardContainerOuter: {
    marginLeft: '30px',
    marginRight: '22px',
    marginTop: '100px',
    '@media screen and (max-width: 960px)': {
      margin: '100px 0 0 0'
    },
  },
  cardContainerInner: {
    '@media screen and (max-width: 916px)': {
      width: '300px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  projectPageSeparatorContainer: {
    textAlign: 'center',
    borderBottom: '1px solid #DFE2E5',
    lineHeight: '0.1em',
    margin: '20px 12px 20px 12px',
  },
  projectPageSeparatorText: {
    background: '#EFF2F6',
    padding: '0 20px',
    color: '#7F8FA4',
  },
  projectPageRegisterText: {
    alignSelf: 'center',
    position: 'relative',
    left: '-5px',
    color: '#354052',
    fontSize: '14px',
    fontWeight: '600',
  },
  prjCardBasePrjsList: {
    height: '325px',
    maxHeight: '350px',
    width: '290px',
    border: '1px solid #DFE2E5',
    borderRadius: '4px',
    backgroundColor: '#FFFFFF',
    margin: '30px 0px 8px 0px',
    userSelect: 'none',
    '&:hover': {
      boxShadow: '0px 3px 21px 0px rgba(0, 0, 0, 0.4) !important',
    },
    cursor: 'pointer',
  },
  projectRegisterCardInnerContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  prjPageSeparatorContainer: {
    textAlign: 'center',
    borderBottom: '1px solid #DFE2E5',
    lineHeight: '0.1em',
    margin: '20px 12px',
  },
  prjPageSeparatorTextInactive: {
    background: '#EFF2F6',
    color: '#7F8FA4',
    cursor: 'pointer',
    padding: '0 20px',
    textTransform: 'uppercase',
  },
  prjPageSeparatorTextActive: {
    background: '#EFF2F6',
    color: '#7F8FA4',
    cursor: 'pointer',
    fontWeight: '600',
    padding: '0 20px',
    textDecoration: 'underline',
    textTransform: 'uppercase',
  },
  prjPageRegisterText: {
    alignSelf: 'center',
    position: 'relative',
    left: '-5px',
    color: '#354052',
    fontSize: '14px',
    fontWeight: '600',
  },
  prjCardRegisterInnerContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  prjPageSeparatorLine: {
    background: '#EFF2F6',
    color: '#7F8FA4',
  },
});
