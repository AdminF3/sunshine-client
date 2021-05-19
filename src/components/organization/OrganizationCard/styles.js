export default (theme) => ({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'visible',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    '&:hover': {
      boxShadow: theme.shadows[8],
    },
    '& .MuiCardHeader-avatar': {
      width: '40%',
    },
    '& .MuiCardHeader-content': {
      paddingLeft: theme.spacing(1),

      '& .MuiCardHeader-title': {
        fontWeight: 600,
        fontSize: '1rem',
      },
    },
    '& .MuiCardActions-root': {
      justifyContent: 'flex-end',
    },
  },
  content: {
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  logoContainer: {
    paddingTop: '18%',
    width: '40%',
    border: '1px solid #DFE2E5',
    borderRadius: '8px',
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: -theme.spacing(2),
    justifyContent: 'center',
    display: 'flex',
  },
  logo: {
    position: 'absolute',
    top: 0,
    left: 0,
    objectFit: 'contain',
    width: `calc(100% - ${theme.spacing(1)}px)`,
    height: `calc(100% - ${theme.spacing(1)}px)`,
    margin: theme.spacing(0.5),
  },
  registerCardRoot: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '100%',
    height: '100%',
    cursor: 'pointer',
    backgroundSize: '180px 150px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center top',
    minHeight: theme.spacing(24),

    '&:hover': {
      boxShadow: theme.shadows[8],
    },
  },
  registerCardTitle: {
    paddingBottom: theme.spacing(2),
  },
});
