export default theme => ({
  containerStyle: {
    height: (window.innerHeight * 0.68),
    margin: '30px 30px 0px 30px',
    border: '3px solid white',
    borderRadius: '4px',
    // Set height of the map container acording to the height of the screen
    '@media screen and (min-height: 568px)': {
      height: '315px',
    },
    '@media screen and (min-height: 667px)': {
      height: '420px',
    },
    '@media screen and (height: 736px)': {
      height: '490px',
    },
    '@media screen and (min-height: 760px)': {
      height: (window.innerHeight * 0.68),
    },
  },
  nameStyle: {
    color: '#F0F3F8',
    fontSize: '14px',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: '10px',
  },
  dividerStyle: {
    margin: '-1px 0px 0px',
    height: '1px',
    border: 'none',
    backgroundColor: '#323F53',
    marginBottom: '7px',
  },
  popUpTextStyle: {
    fontSize: '10px',
    color: '#F0F3F8',
    float: 'left',
    marginTop: '3px',
  },
  popUpValuesStyle: {
    fontSize: '10px',
    color: '#F0F3F8',
    float: 'right',
    marginTop: '3px',
  },
})
