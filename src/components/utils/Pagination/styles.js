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
});
