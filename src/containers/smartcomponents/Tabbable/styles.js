export default (theme) => ({
  paper: {
    position: 'relative',
    padding: '80px 20px 20px 20px',
    boxShadow: `
      inset 0 1px 0 0 rgba(0, 0, 0, .14),
      inset -1px 0 0 rgba(0, 0, 0, .14),
      inset 0 -1px 0 0 rgba(0, 0, 0, .14),
      inset 1px 0 0 rgba(0, 0, 0, .14)
    `,
    '& > .UserTooltip-grow': {
      position: 'absolute',
      top: 0,
      right: 0,
    }
  },
  tabsWrapper: {
    padding: 15,
    borderRadius: 3,
    background: 'linear-gradient(-60deg, #ffffff, #fafafa)',
    boxShadow: theme.shadows[3],
    position: 'absolute',
    top: -20,
    display: 'inline-block',
  },
  navTabs: {
    '& .MuiTab-root': {
      fontSize: '0.875rem',
      border: '0 !important',

      '&.MuiTab-labelIcon': {
        minHeight: theme.spacing(6),

        '& .MuiTab-wrapper > *:first-child': {
          marginBottom: 0,
        },
      },
      '& .MuiTab-wrapper': {
        flexDirection: 'row',
        '& > *:first-child': {
          marginRight: theme.spacing(1),
        },
      },
    },
    '& .MuiTabs-indicator': {
      display: 'none',
    },
    '& .Mui-selected': {
      transition: '0.2s background-color 0.1s',
      backgroundColor: 'rgba(0, 0, 0, .03)',
      borderRadius: 3,
    },
  },
  secondaryHeader: {
    position: 'absolute',
    top: 15,
    right: 20,
    display: 'inline-block',
    minWidth: 250,
  }
});
