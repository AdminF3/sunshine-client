export default function(theme) {
  return {
    formWidget: {
      position: 'relative',
      flexGrow: 1,
      marginTop: theme.spacing(2),
    },
    websiteGridWrapper: {
      '& .MuiInputAdornment-positionStart': {
        marginRight: 0,
      },
    },
    centeredContainer: {
      margin: '0 35%',
    },
    logoUpload: {
      border: '1px solid',
      borderColor: theme.palette.action.disabled,
      borderRadius: theme.shape.borderRadius,
      paddingLeft: theme.spacing(1),

      '&:hover': {
        borderColor: theme.palette.text.primary,
      },
      '& .MuiAvatar-root': {
        width: 80,
        marginRight: theme.spacing(1),
      },
      '& .MuiListItemText-root': {
        textAlign: 'center',
      },
    },
  };
}
