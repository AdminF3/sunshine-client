export default {
  root: {
    flexGrow: 1,
    boxSizing: 'border-box',
    // border: '1.09px solid #DFE2E5',
    backgroundColor: 'white',
    padding: '0px 10px 10px 10px',
    width: '100%',
    marginTop: '10px',
  },
  dropzoneOuterContainer: {
    position: 'relative',
    padding: '0 10px 0 0',
    '@media screen and (max-width: 1199px)': {
      padding: 0
    },
  },
  dropzoneContainer: {
    width: '100%'
  },
  uploadButton: {
    backgroundColor: '#ffeb3b !important',
    height: '58px',
    width: '100%',
    marginRight: '10px',
    alignSelf: 'flex-end',
    marginTop: '10px',
    '@media screen and (max-width: 1199px)': {
      marginBottom: '20px',
    },
  },
  uploadedFilesContainer: {
    position: 'relative',
    height: '304px',
    overflow: 'auto',
    borderRadius: '4.34px',
    border: '1.09px solid #DFE2E5',
    marginTop: '10px',

    '& td': {
      wordBreak: 'break-all',
    },
  },
  fileNames: {
    fontSize: '15px',
    fontWeight: 600,
  },
  actions: {
    fontSize: '15px',
    fontWeight: 600,
    paddingRight: '40px !important',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
    margin: 'auto',
    maxHeight: 160,
    zIndex: 3,
    '&:hover': {
      opacity: 0.3,
      zIndex: 2,
    }
  },
  logoDropzoneContainer: {
    marginTop: 10,
    height: '100%'
  },
  logoDropzoneActiveDrag: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    cursor: 'pointer',
    borderColor: '#C8C8C8',
    backgroundImage: 'repeating-linear-gradient(-45deg, #F0F0F0, #F0F0F0 25px, #C8C8C8 25px, #C8C8C8 50px)',
    '-webkitAnimation': 'progress 2s linear infinite !important',
    '-mozAnimation': 'progress 2s linear infinite !important',
    animation: 'progress 2s linear infinite !important',
    backgroundSize: '150% 100%',
    border: '1px solid black',
    textAlign: 'center',
    display: 'flex',
    '-msFlexPack': 'center',
    justifyContent: 'center',
    '-msFlexAlign': 'center',
    alignItems: 'center',
    fontFamily: 'ProximaNova',
    fontSize: '100%',
    fontWeight: '600',
  },
  dropzoneLoading: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 2,
  },
  dropzoneDeleteOverlay: {
    backgroundColor: '#ffffff',
    opacity: '.9',
  },
  droppedFileContainer: {
    display: 'inline-flex',
    width: '100%',
    height: '100%',
    overflowX: 'auto',
  },
  dropzoneLabel: {
    fontFamily: 'ProximaNova',
    fontSize: '80%',
    fontWeight: '600',
    lineHeight: '1.36',
    textAlign: 'center',
    color: '#7f8fa4',
    alignSelf: 'center',
    marginLeft: '5%',
    marginRight: '5%',
    boxSizing: 'border-box',
  },
  dropzoneLabelSpan: {
    color: '#354052',
    textDecoration: 'underline',
  },
  logoDropzoneInner: {
    border: 'solid 1px #dfe3e9',
    height: '80%',
  },
  dashedIconContainer: {
    opacity: '0.4',
    borderRadius: '4px',
    border: '4px dashed rgb(206, 208, 218)',
    boxSizing: 'border-box',
    padding: '15%',
    textAlign: '-webkit-center',
    height: '100%'
  },
  floatingButton: {
    width: '36px',
    height: '36px',
    boxShadow: 'none',
    marginRight: '13px'
  },
  fileName: {
    maxWidth: '200px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  selectedFileOnHoverMessage: {
    position: 'absolute',
    top: '65px',
    margin: 'auto',
    zIndex: '1',
    fontWeight: 600,
    right: '25%',
    left: '25%',
    cursor: 'default'
  },
  droppedFileDocumentStyle: {
    height: '155px',
    width: '100%',
    fontSize: '80%',
    fontWeight: '600',
    lineHeight: '1.36',
    textAlign: 'center',
    color: '#7f8fa4',
    alignSelf: 'center',
    marginLeft: '5%',
    marginRight: '5%',
    boxSizing: 'border-box',
    zIndex: '2',
    '&:hover': {
      zIndex: '1',
    },
  },
  dropzoneInputWrapper: {
    outline: 'none',
    height: '100%'
  },
  noUploads: {
    color: '#7f8fa4',
    margin: '30px auto',
    fontSize: 18,
    textAlign: 'center'
  },
  section: {
    height: '75%',
  },
  hintContainer: {
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  documents: {
    '& .MuiDialog-scrollPaper': {
      justifyContent: 'flex-end'
    },
    '& .MuiDialog-paper': {
      minHeight: '100%',
      minWidth: '35%',
      margin: 0
    }
  },
};
