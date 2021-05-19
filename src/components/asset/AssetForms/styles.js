export default function(theme) {
  return {
    container: {
      position: 'relative',
      flexGrow: 1,
    },
    formWidget: {
      position: 'relative',
      flexGrow: 1,
      marginTop: theme.spacing(2),
    },
    map: {
      boxSizing: 'border-box',
      zIndex: 1,
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    sidebar: {
      position: 'absolute',
      top: theme.spacing(1),
      left: theme.spacing(1),
      zIndex: 2,
      minWidth: '20%',
      maxHeight: `calc(100% - ${theme.spacing(2)}px)`,
      display: 'flex',
      flexDirection: 'column',
      '& form': {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      },
    },
    searchInputs: {
      position: 'relative',
      marginBottom: theme.spacing(1),
      width: 300,

      '& .formWrapper': {
        position: 'relative',
        zIndex: 1,
      },
      '& .hintWrapper': {
        marginTop: -theme.spacing(0.5),
        paddingTop: theme.spacing(0.5),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        zIndex: 0,
        color: theme.palette.text.secondary,
        display: 'flex',
        justifyContent: 'center'
      },
    },
    resultsContainer: {
      flexGrow: 1,
      overflowY: 'auto',
      width: 300,

      '& > :first-child': {
        padding: theme.spacing(2),
      },
      '& .MuiList-root': {
        padding: `${theme.spacing(1)}px 0`,

        '& .MuiListItemIcon-root': {
          minWidth: theme.spacing(5),
        },
      },
      '& .PinnedResultContainer': {

        '& .TitleContainer': {
          position: 'relative',
          width: '100%',
          marginBottom: theme.spacing(1),

          '& button': {
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: theme.spacing(3),
            right: -theme.spacing(2),
            padding: 0,
            border: 0,
            cursor: 'pointer',
            outline: 0,

            '&:hover .MuiSvgIcon-root': {
              color: 'black',
            },

            '& .MuiSvgIcon-root': {
              height: '100%',
              color: 'grey',
            },
          },
        },
      },
    },
    input: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    loadingOverlay: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      background: '#fafafa',
      backgroundColor: 'rgba(0, 0, 0, .46)',
      color: '#fff',
      zIndex: 2,

      '& .MuiSvgIcon-root': {
        fontSize: '3.25rem',
      },
    },
    radioLabel: {
      width: '100%',
      display: 'flex',

      '& .MuiFormControlLabel-label': {
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
      },
    },
  };
}
