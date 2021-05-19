export default (theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    '&.selected': {
      boxShadow: theme.shadows[6],
    },
    '&:hover': {
      boxShadow: theme.shadows[8],
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
  media: {
    paddingTop: '48%',
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
    backgroundPosition: 'center 35%',
    minHeight: theme.spacing(24),

    '&:hover': {
      boxShadow: theme.shadows[8],
    },
  },
  registerCardTitle: {
    paddingBottom: theme.spacing(2),
  },
  requestRegistrationButton: {
    margin: `0 ${theme.spacing(1)}px`,
  },
  requestRegistrationInfo: {
    position: 'absolute',
    top: -theme.spacing(1.5),
    right: -theme.spacing(1.5),
    borderRadius: '100%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
  }
});
