export default theme => ({
  contentWrapper: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  loader: {
    height: 2,
    marginTop: theme.spacing(4),
  },
  list: {
    '& .actions': {
      marginTop: theme.spacing(1),
      '& > :first-child': {
        marginLeft: -theme.spacing(0.5),
        marginRight: theme.spacing(1),
      },
    },
  },
  iconButtons: {
    marginTop: theme.spacing(1),

    '& > button': {
      '&:last-child': {
        marginRight: 0,
      },

      marginRight: theme.spacing(0.5),
    },
  },
  buttonApprove: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.info.contrastText,
    '&.MuiButtonBase-root': {
      borderColor: theme.palette.info.main,
    },
    '&:hover': {
      backgroundColor: theme.palette.info.dark,
    },
  },
  buttonDecline: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    '&.MuiButtonBase-root': {
      borderColor: theme.palette.error.main,
    },
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
  buttonWarning: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.warning.contrastText,
    '&.MuiButtonBase-root': {
      borderColor: theme.palette.warning.main,
    },
    '&:hover': {
      backgroundColor: theme.palette.warning.dark,
    },
  },
});
