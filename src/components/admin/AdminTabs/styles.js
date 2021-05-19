export default (theme) => ({
  root: {
    backgroundColor: '#FFFFFF',
  },
  indicator: {
    backgroundColor: '#ffeb3b',
  },
  tabLabelStyle: {
    fontSize: 14,
    fontWeight: 600,
    textTransform: 'none',
    minWidth: 'inherit',
    padding: `${theme.spacing(1)}px ${theme.spacing(4)}px`,
  },
  header: {
    position: 'fixed',
    width: 'calc(100% - 250px)',
    '@media screen and (max-width: 960px)': {
      width: '100%',
    },
  },
  tabsContainer: {
    height: '100%',
    paddingBottom: 20,
    paddingTop: 70,
  },
  tabsContainerInner: {
    display: 'contents',

    '&.loading': {
      display: 'none',
    },
  },
  permissionContainer: {
    textAlign: 'center',
  },
});
