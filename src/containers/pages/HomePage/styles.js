export default theme => ({
  mapContainer: {
    marginBottom: theme.spacing(3),
    position: 'relative',
    flexGrow: 1,
  },
  mapRoot: {
    height: '100%',
    minHeight: 400,
    position: 'relative',
    boxShadow: theme.shadows[1],

    '& .leaflet-container': {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 0,
    },
  },
  country: {
    fillOpacity: 0.35,
    fill: '#000',
    stroke: 'rgba(255,255,255,0.5)',
    strokeWidth: 1,
    '&:not(.active):hover': {
      fill: theme.palette.secondary.main,
      color: '#000',
    }
  },
  popupWhiteColor: {
    color: '#fff',
  },
  popupWhiteBackground: {
    color: '#fff',
  },
  divider: {
    margin: theme.spacing(1),
    height: 1,
    border: 'none',
    backgroundColor: '#323F53',
  },
  navBackButton: {
    position: 'absolute',
    left: 8,
    top: 8,
    zIndex: 1,
  },
  sidebar: {
    flexGrow: 1,
    position: 'relative',

    '& .MuiDivider-root': {
      margin: `${theme.spacing(1)}px 0`,
    },
  },
  sidebarContentWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    padding: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`,
    overflow: 'auto',
  },
  sidebarContent: {

    '& .MuiGrid-item:last-child': {
      fontWeight: 600,
    },
  },
  sidebarCloseIcon: {
    cursor: 'pointer',
  },
  projectDetails: {
    '& .MuiAccordionDetails-root': {
      display: 'block',
    },
  },
});
