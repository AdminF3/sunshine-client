export const table = (theme) => ({
  tableHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  tableContent: {
    display: 'block',
  },
  tableRow: {
    display: 'flex',
    alignItems: 'center',
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing(1)}px 0`,
    '&:last-child': {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    '&:hover': {
      backgroundColor: theme.palette.background.default,
    },
  },
  columnNu: {
    padding: theme.spacing(2),
  },
  actionButtons: {
    '& > *': {
      marginRight: theme.spacing(1),
      '&:last-child': {
        marginRight: 0,
      }
    },
    '& .MuiButtonBase-root': {
      border: `1px solid ${theme.palette.divider}`,
    }
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
  contentWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  loadingPlaceholder: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 2,
    background: '#fff',
    opacity: 0.4,
    margin: '81px 21px 21px 21px',
  },
  loader: {
    height: 2,
    marginTop: theme.spacing(4),
  },
  sentencize: {
    '&:first-letter': {
      textTransform: 'capitalize',
    },
  },
});
