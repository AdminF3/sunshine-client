export default theme => ({
  prjEnergyContainer: {
    margin: '30px',
    '@media screen and (max-width: 960px)': {
        margin: '10px',
    },
  },
  prjEnergyInnerContainer: {
    padding: 0,
    margin: 0,
  },
  expandableTitle: {
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '1.58',
    textAlign: 'left',
    color: '#7f8fa4',
  },
  expansionPanelDetails: {
    backgroundColor: '#fafbfc',
    border: 'solid 1px #dfe2e5',
  }
});
