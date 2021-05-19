export default (theme) => ({
  root: {
    marginTop: 130,
  },
  indicator: {
    backgroundColor: '#ffeb3b',
  },
  tabLabelStyle: {
    fontSize: 14,
    fontWeight: 600,
    textTransform: 'none',
  },
  header: {
    position: 'fixed',
    width: 'calc(100% - 250px)',
    '@media screen and (max-width: 960px)': {
      width: '100%',
    },
    zIndex: 3,
    backgroundColor: '#EFF2F6',

    '& .MuiTabs-flexContainer': {
      justifyContent: 'center',
    },
    '& .MuiTabs-indicator': {
      display: 'none',
    },
    '& .MuiTab-root': {
      minWidth: 'calc(100%/4)',

      '&.Mui-selected': {
        backgroundColor: '#ffffff',
      },
    },
  },
  subHeader: {
    position: 'fixed',
    width: 'calc(100% - 250px)',
    marginTop: theme.spacing(6),
    '@media screen and (max-width: 960px)': {
      width: '100%',
    },
    zIndex: 2,
    backgroundColor: '#ffffff',
    boxShadow: theme.shadows[3],
  },
  tabsContainer: {
    height: '100%',
    paddingTop: 70,
  },
  permissionContainer: {
    textAlign: 'center',
  },
  pageTooltip: {
    zIndex: 5,
    position: 'fixed',
    top: 70,
    right: 0,
  },
});
