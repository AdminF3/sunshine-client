export default theme => ({
    closeButton: {
      fontSize: '2em',
      float: 'right',
      margin: '0px 10px 0px 10px',
      opacity: '0.6',
      color: '#354052',
      transform: 'rotate(45deg)',
      userSelect: 'none',
      top: "15px",
      position: "absolute",
      right: "10px",
      textAlign: "center",
      height: "33px",
      width: "33px",
      '&:hover': {
        opacity: 1,
        color: '#354052',
        borderRadius: '100%',
        cursor: 'pointer',
      },
    },
});
  