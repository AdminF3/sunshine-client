const drawerWidth = 250;

export default theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: theme.spacing(1),
  },
  logoLink: {
    display: 'block',
    position: 'relative',
    paddingTop: 68,

    '& img': {
      position: 'absolute',
      top: 2,
      bottom: 0,
      width: 150,
      height: 60,
      marginLeft: 12,
      objectFit: 'cover',
    },
  },
  menu: {
    '& .MuiMenuItem-root.active': {
      backgroundColor: theme.palette.secondary.light,
      boxShadow: `inset 4px 0 0 ${theme.palette.secondary.dark}`,

      '& .MuiListItemIcon-root > svg': {
        fill: theme.palette.secondary.dark,
      },
    },
  },
  appBar: {
    backgroundColor: '#ffffff',
    height: '70px',
    marginLeft: drawerWidth,
    '@media screen and (min-width: 960px)': {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    borderBottom: '2px solid #dfe2e5',
    boxShadow: 'none',
  },
  menuButton: {
    marginRight: 20,
    color: '#000000',
    '@media screen and (min-width: 960px)': {
      display: 'none',
    },
  },
  toolbar: {
    position: 'relative',
    zIndex: 1100,
    width: '150px',
    height: '68px',
    display: 'flex',
    marginLeft: '24px',
    marginRight: '24px',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  divider: {
    height: '2px',
  },
  listDivider: {
    margin: `${theme.spacing(2)}px ${theme.spacing(2)}px`,
  },
  authMenuOuterContainer: {
    position: 'absolute',
    right: '24px',
    display: 'flex',
  },
  authMenuInnerContainer: {
    float: 'right',
    margin: 'auto',
    height: 30,
    padding: 5,
    background: 'linear-gradient(180deg, #39B54A 0%, #34AA44 97.78%)',
    borderRadius: 3,
    border: '1px solid #249533'
  },
  loggedUserIconMenu: {
    display: 'flex',
    position: 'absolute',
    right: '25px',
    top: 0,
    height: '100%'
  },
  menuItem: {
    backgroundColor: '#FDFFE7',
    borderLeft: '5px solid yellow',
  },
  toolBarMobile: {
    minHeight: '70px',
  },
  linkTextStyle: {
    textDecoration: 'none',
    margin: 'auto 5px',
    color: 'white',
    fontSize: '14px',
    fontWeight: '600',
  },
  textDecorationNone: {
    textDecoration: 'none',
  },
  arrowIconStyle: {
    color: 'white',
    fontSize: '30px',
    fontWeight: '600',
    marginTop: '-12px',
    maxHeight: '15px',
  },
  verticalDivider: {
    color: 'white',
    fontSize: '14px',
    fontWeight: '600',
  },
  verticalSeparator: {
    marginLeft: '10px',
    marginRight: '10px',
    borderLeft: '2px solid #354052',
    height: '19px',
    marginTop: 'auto',
  },
  avatar: {
    position: 'relative',
    float: 'left',
    margin: '15px 0px 26px 0px',
  },
  iconButton: {
    position: 'relative',
    float: 'right',
    margin: '15px 0px 20px 0px',
    '&:hover': {
      backgroundColor: 'transparent',
    }
  },
  activeIconCollor: {
    color: 'yellow',
  },
  userName: {
    margin: '25px',
    color: '#7F8FA4',
    fontWeight: '600'
  },
  logosWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: theme.spacing(3),
    '& img': {
      maxWidth: '80%',
    },
    '& img[alt="Sunshine"]': {
      maxWidth: '60%',
      marginLeft: '-25%',
    },
  },
  europeanWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 10,
    '& img': {
      width: 50,
      height: 30,
      marginLeft: 15,
    }
  },
  europeanTitle: {
    marginLeft: 20,
    textAlign: 'left',
    fontWeight: 600,
    fontSize: 10
  },
  logosTitle: {
    fontSize: 11,
    fontWeight: 600,
    marginBottom: theme.spacing(0.5),
  },
  createMeetingDial: {
    position: 'relative',

    '& .MuiSpeedDial-actions': {
      position: 'absolute',
      bottom: '100%',
      width: '100%',
      alignItems: 'center',
      paddingRight: '50%',

      '& .SpeedDialAction > span:last-child': {
        fontSize: 12,
        fontWeight: 600,
        padding: '2px 8px',
        backgroundColor: theme.palette.background.paper,
        borderRadius: 4,
        boxShadow: theme.shadows[4],
      }
    },
    '& .MuiSpeedDial-fab': {
      marginBottom: theme.spacing(2),
      borderRadius: 4,
      width: '90%',
      height: theme.spacing(3),

      '& .MuiSpeedDialIcon-root': {
        marginRight: theme.spacing(1),
      },
    },
    '& .SpeedDialAction': {
      display: 'flex',
      alignItems: 'center',
      position: 'absolute',
      left: theme.spacing(1),

      '& > :last-child': {
        marginLeft: theme.spacing(2),
      },
    },
  },
});
