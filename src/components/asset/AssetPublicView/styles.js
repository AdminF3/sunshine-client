export default theme => ({
  root: {
    margin: theme.spacing(4),
  },
  cardHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  validationStatus: {
    display: 'inline-flex',
  },
  mapContainer: {
    width: '100%',
    height: 'calc(100vh / 2)',
  },
});
