export default theme => ({
  innerContainer: {
    height: '100%',
    border: '1.09px solid #DFE2E5',
    backgroundColor: 'white',
    padding: '10px 0px',
    marginBottom: '10px',
    marginLeft: '20px',
  },
  imageContainer: {
    width: '100%',
    position: 'relative',
  },
  image: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    objectFit: 'scale-down',
  },
  dataRow: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '20px',
    paddingBottom: '20px',
    paddingLeft: '20px',
    borderBottom: '1px solid #E6EAEE',
  },
  dataTitle: {
    color: '#91A1B3',
    fontSize: '16px',
    fontWeight: '600',
    textDecoration: 'none',
    '@media screen and (max-width: 960px)': {
      fontSize: '13px'
    },
  },
  dataContent: {
    marginLeft: 'auto',
    marginRight: '10px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: '600',
    textDecoration: 'none',
    color: '#000000',
    width: '50%',
    textAlign: 'right',
    '@media screen and (max-width: 960px)': {
      fontSize: '13px'
    },
  },
  title: {
    textAlign: 'center',
    fontSize: '18px',
    margin: '15px 0px',
    paddingLeft: '20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #E6EAEE',
    textDecoration: 'none',
    color: '#000000',
    display: 'flex',
  },
})
