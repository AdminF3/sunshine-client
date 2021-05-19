export default (theme) => ({
    root: {
      flexGrow: 1,
      width: '100%',
      '@media (max-width: 960px)': {
        padding: '30px 15px',
      },
      cursor: 'pointer',
    },
    subtitleWrapper: {
      padding: '8px 16px',
    },
    gridWrapper: {
      margin: 20,
    },
    container: {
      flexGrow: 1,
      boxSizing: 'border-box',
      border: '1.09px solid #DFE2E5',
      backgroundColor: 'white',
      padding: '20px 10px 10px',
      '@media (max-width: 960px)': {
        padding: '40px 15px',
        flexWrap: 'nowrap',
        overflowX: 'auto',
      },
      width: '100%',
      marginBottom: 20,
      flexWrap: 'nowrap',
      overflowX: 'auto',
      textAlign: 'center'
    },
    circle: {
      width: 33,
      height: 33,
      border: 'solid 1px #e6eaee',
      backgroundColor: '#fafbfc',
      borderRadius: 30,
      margin: 'auto',
      marginBottom: 4,
    },
    iconCircle: {
      width: 33,
      height: 33,
      border: 'solid 1px #feea3b',
      borderRadius: 30,
      margin: 'auto',
      padding: 4,
    },
    yellowCircle: {
      width: 33,
      height: 33,
      border: 'solid 1px #feea3b',
      backgroundColor: '#feea3b',
      borderRadius: 30,
      margin: 'auto',
      marginBottom: 4,
    },
    yellowCircleMargin: {
      width: 33,
      height: 33,
      border: 'solid 1px #feea3b',
      backgroundColor: '#feea3b',
      borderRadius: 30,
      margin: 'auto',
      marginBottom: 4,
    },
    stepText: {
      fontSize: 14,
      textAlign: 'center',
      color: '#848c98',
      width: 94,
      marginTop: 5,
    },
    stepNumber: {
      fontSize: 14,
      marginTop: 5,
      textAlign: 'center',
      color: '#848c98',
    },
    whiteStepNumber: {
      fontSize: 14,
      marginTop: 5,
      textAlign: 'center',
      color: '#fff',
    },
    line: {
      backgroundColor: '#c2cad4',
      height: 2,
      width: 100,
      marginTop: 20,
      '@media (max-width: 1640px)': {
        width: 60,
      },
      '@media (max-width: 1370px)': {
        width: 30,
        minWidth: 10,
      },
    },
    secondContainer: {
      flexGrow: 1,
      boxSizing: 'border-box',
      border: '1.09px solid #DFE2E5',
      backgroundColor: 'white',
      marginBottom: 20,
    },
    title: {
      fontSize: 18,
      margin: '20px 30px',
      textAlign: 'left',
      color: '#7f8fa4',
    },
    oddEl: {
      padding: '20px 30px',
      borderRight: 'solid 1px #dfe2e5',
      borderTop: 'solid 1px #dfe2e5',
    },
    evenEl: {
      padding: '20px 30px',
      borderTop: 'solid 1px #dfe2e5',
    },
    fileText: {
      fontSize: 14,
      color: '#354052',
    },
    checkIcon: {
      fontSize: 30,
      color: '#45b854',
    },
    addButton: {
      width: 294,
      height: 45,
      borderRadius: 4,
      boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.35)',
      backgroundColor: '#feea3b',
      color: '#4d4e50',
      fontSize: 18,
      '&:hover': {
        backgroundColor: '#e4d235',
      }
    },
    stepWrapper: {
      cursor: 'pointer',
    },
    imageContainer: {
      width: 33,
      height: 33,
      margin: 'auto',
    },
    step: {
      cursor: 'pointer',
    },
    activeStep: {
      cursor: 'pointer',

      '& .MuiStepLabel-label': {
        fontWeight: 600,
        fontSize: '0.950rem',
        paddingLeft: 5
      },
    },
    disabledStep: {
      '& .MuiStepLabel-root': {
        cursor: 'not-allowed !important'
      },
    },
    forfaitingPayoutDateTitle: {
      padding: '8px 16px',
      border: `1px dashed ${theme.palette.divider}`,
      borderRadius: 4,
    },
  });
