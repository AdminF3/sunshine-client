export default {
    container: {
        backgroundColor: '#FFFFFF',
        height: '710px',
        position: 'relative',
    },
    header: {
        fontSize: '18px',
        color: '#354052',
        padding: '30px',
        position: 'relative',
    },
    title: {
        textAlign: 'left',
    },
    innerContainer: {
        padding: '30px',
    },
    organizationNameInput: {
        width: '100%',
        height: '38px',
        border: '1px solid #E6EAEE',
        margin: 'auto',
        padding: '5px 10px 5px 10px',
        display: 'flex',
        textAlign: 'center',
        borderRadius: '4px',
        backgroundColor: '#FFFFFF',
        marginBottom: '20px'
    },
    organizationNameLabel: {
        fontSize: '16px',
        textAlign: 'left',
        color: '#7f8fa4',
        paddingBottom: '10px',
    },
    footer: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        height: '60px',
        backgroundColor: '#f0f3f8',
    },
    createButton: {
        marginRight: 25,
        minWidth: '90px',
        borderRadius: '4px',
        color: '#4d4e50',
        boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.35)',
        backgroundColor: '#feea3b',
        '&:hover': {
            backgroundColor: '#feea3b',
        },
    },
    legalFormsLabel: {
        fontSize: '16px',
        textAlign: 'left',
        color: '#7f8fa4',
        paddingBottom: '10px',
    },
    errorStyle: {
        width: '100%',
        marginBottom: '20px',
        color: 'red',
        fontWeight: 600,
        textAlign: 'center',
        height: '20px'
    },
    calendarClass: {
        zIndex: 9999
    },
    dialog: {
        '& .MuiDialog-paper': {
            height: 'inherit'
        },
    },
    headerFooterColor: {
        backgroundColor: '#f0f3f8',
        justifyContent: 'space-between'
    },
    textField: {
            width: '100%',
    },
    documentsList: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        margin: 0,
        padding: 0
    },
    chip: {
        maxWidth: 150,
        margin: 10
    },
    uploadContainer: {
        marginTop: 30
    },
    cancelButton: {
        marginLeft: 25
    },
    customSelect: {
        padding: '0px 5px',
        backgroundColor: '#FFFFFF',
        '& .MuiSelect-select': {
            backgroundColor: '#FFFFFF',
        }
    }
};