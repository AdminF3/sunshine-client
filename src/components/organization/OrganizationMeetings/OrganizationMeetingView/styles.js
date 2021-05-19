export default () => ({
    container: {
        backgroundColor: '#FFFFFF',
        margin: '30px',
        paddingBottom: '70px',
        borderRadius: '4px',
        border: 'solid 1px #dfe2e5',
        position: 'relative'
    },
    title: {
        fontSize: '18px',
        textAlign: 'left',
        color: '#354052',
        padding: '20px',
        borderBottom: 'solid 1px #dfe2e5',
        justifyContent: 'space-between',
    },
    subTitle: {
        display: 'inline-flex'
    },
    subTitleHeader: {
        fontSize: '0.8rem',
        textTransform: 'uppercase'
    },
    subTitleLabel: {
        fontSize: '0.8rem',
        marginLeft: 4,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    subTitleIcon: {
        width: '1rem',
        height: '1rem',
        marginRight: 3,
    },
    innerContainer: {
        paddingTop: '20px',
    },
    input: {
        width: '100%',
        height: '38px',
        border: '1px solid #C4C4C4',
        margin: 'auto',
        padding: '5px 10px 5px 10px',
        display: 'flex',
        borderRadius: '4px',
        backgroundColor: '#FFFFFF',
    },
    inputLabel: {
        fontSize: '16px',
        textAlign: 'left',
        color: '#7f8fa4',
        paddingBottom: '10px',
    },
    legalFormsLabel: {
        fontSize: '16px',
        textAlign: 'left',
        color: '#7f8fa4',
        paddingBottom: '10px',
    },
    participantsList: {
        height: '267px',
        border: 'solid 1px #C4C4C4',
        borderRadius: '4px',
        backgroundColor: '#FFFFFF'
    },
    inputLeftLabel: {
        width: '50px',
        textAlign: 'left',
        color: '#7f8fa4',
        fontSize: '14px',
        paddingLeft: '5px',
        paddingTop: '9px'
    },
    participantsInput: {
        height: '38px',
        width: 'calc(100% - 51px)',
        border: 'none',
        padding: '0 5px',
        borderLeft: '1px solid #C4C4C4'
    },
    participantsAddButton: {
        border: 'none',
        backgroundColor: 'lightgray',
        height: '77px',
        borderRadius: '0px 4px 0px 0px'
    },
    listItem: {
        padding: '10px',
        cursor: 'pointer',
        color: '#808080',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)'
        }
    },
    root: {
        flexGrow: 1,
        boxSizing: 'border-box',
        border: '1.09px solid #DFE2E5',
        backgroundColor: 'white',
        padding: '0px 10px 10px 10px',
        width: '100%',
        marginTop: '10px',
    },
    dropzoneOuterContainer: {
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
        height: '304px',
        overflow: 'auto',
        borderRadius: '4.34px',
        border: '1.09px solid #DFE2E5',
        marginTop: '10px',
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
        borderRadius: '0',
        margin: 'auto',
        maxHeight: '160px',
        zIndex: '3',
        '&:hover': {
            opacity: 0.3,
            zIndex: '2',
        }
    },
    logoDropzoneContainer: {
        marginTop: '60px',
    },
    logoDropzoneActiveDrag: {
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
        height: '158px',
        width: '100%',
        fontFamily: 'ProximaNova',
        fontSize: '100%',
        fontWeight: '600',
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
    },
    dashedIconContainer: {
        opacity: '0.4',
        borderRadius: '4px',
        border: '4px dashed rgb(206, 208, 218)',
        boxSizing: 'border-box',
        padding: '15%',
        textAlign: '-webkit-center',
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
    droppedFileDocumentStyle: {
        height: '155px',
        width: '100%',
        fontSize: '80%',
        fontWeight: '600',
        lineHeight: '1.36',
        textAlign: 'center',
        color: '#7f8fa4',
        background: '#FFFFFF',
        alignSelf: 'center',
        marginLeft: '5%',
        marginRight: '5%',
        boxSizing: 'border-box',
        zIndex: '2',
        '&:hover': {
            zIndex: '1',
        },
    },
    uploadsList: {
        marginLeft: '10px'
    },
    saveButton: {
        position: 'absolute',
        right: 25,
        bottom: 12,
        minWidth: '90px',
        borderRadius: '4px',
        color: '#4d4e50',
        boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.35)',
        backgroundColor: '#feea3b',
        '&:hover': {
            backgroundColor: '#feea3b',
        },
    },
    datePicker: {
        display: 'inline-grid',
        marginBottom: 20
    },
    textArea: {
        width: '100%',
        minHeight: '90px',
        resize: 'vertical',
        border: '1px solid #C4C4C4',
        margin: 'auto',
        padding: '5px 10px 5px 10px',
        display: 'flex',
        borderRadius: '4px',
        backgroundColor: '#FFFFFF',
    }
});
