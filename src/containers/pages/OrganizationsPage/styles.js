export default theme => ({
  innerClass: {
    margin: '20px auto',
    display: 'inline-flex',
    padding: 0,
    boxShadow: theme.shadows[4],
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
    marginLeft: 30,
    marginTop: 80,
  },
  cardContainerInner: {
    paddingTop: 20,
  },
  organizationCardRegisterBase: {
    border: '1px dashed #d0d6df',
    boxShadow: 'none !important',
    cursor: 'pointer',
    minHeight: '140px',
    height: '160px',
    borderRadius: '4px',
    backgroundColor: '#FFFFFF',
    margin: '30px 0px 8px 0px',
    userSelect: 'none',
    '&:hover': {
      border: '1px dashed #b2bcca !important'
    },
  },
  orgPageSeparatorContainer: {
    textAlign: 'center',
    borderBottom: '1px solid #DFE2E5',
    lineHeight: '0.1em',
    margin: '20px 12px',
  },
  orgPageSeparatorTextInactive: {
    background: '#EFF2F6',
    color: '#7F8FA4',
    cursor: 'pointer',
    padding: '0 20px',
    textTransform: 'uppercase',
  },
  orgPageSeparatorTextActive: {
    background: '#EFF2F6',
    color: '#7F8FA4',
    cursor: 'pointer',
    fontWeight: '600',
    padding: '0 20px',
    textDecoration: 'underline',
    textTransform: 'uppercase',
  },
  orgPageRegisterText: {
    alignSelf: 'center',
    position: 'relative',
    left: '-5px',
    color: '#354052',
    fontSize: '14px',
    fontWeight: '600',
  },
  organizationCardRegisterInnerContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  orgPageSeparatorLine: {
    background: '#EFF2F6',
    color: '#7F8FA4',
  },
});
