export default (theme) => ({
  root: {
    margin: theme.spacing(4),
  },
  card: {
  },
  cardHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  validationStatus: {
    display: 'inline-flex',
  },
  logoWrapper: {
    width: '50%',
  },
  titleWrapper: {
    width: '50%',
    margin: `${theme.spacing(4)}px 0`,

    '& .address': {
      color: theme.palette.text.secondary,
      fontSize: '.75rem',
      margin: `${theme.spacing(1)}px 0`,
    },
  },
  contentWrapper: {
    width: '100%',
    padding: theme.spacing(4),
  },
  divider: {
    alignSelf: 'stretch',
    margin: `0 ${theme.spacing(4)}px`,
  },
  projectsList: {
    '& .MuiList-root': {
      maxHeight: 300,
      overflowY: 'auto',
    },
    '& .MuiListItemSecondaryAction-root': {
      minWidth: theme.spacing(1),
    },
    '& .MuiBadge-anchorOriginBottomLeftRectangle': {
      transform: 'scale(1) translate(-38%, 74%)',
    },
  },
});
