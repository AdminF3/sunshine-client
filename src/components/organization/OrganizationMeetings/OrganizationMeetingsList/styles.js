export default {
    container: {
        backgroundColor: '#FFFFFF',
        border: '1.09px solid #DFE2E5',
        borderRadius: '4.34px',
    },
    contentWrapper: {
        display: 'flex',
        justifyContent: 'center',
        margin: '16px 0',
    },
    header: {
        padding: 20,
        color: '#354052 !important',
        display: 'flex',
    },
    subHeader: {
        height: '50px',
        position: 'relative',
        borderBottom: '1px #DFE2E5 solid',
        borderTop: '1px #DFE2E5 solid',
        textAlign: 'left',
        padding: 16,
        color: '#7f8fa4',
        paddingRight: '31px',
    },
    meetingsTitle: {
        color: '#354052',
        fontSize: '17px',
        lineHeight: '22px',
    },
    buttonsContainer: {
        position: 'absolute',
        right: 20,
        top: 12,
    },
    exportCSV: {
        marginRight: 20
    },
    listItem: {
        width: '100%',
        borderBottom: '1px #DFE2E5 solid',
        height: '40px',
        cursor: 'pointer',
        display: 'inline-flex',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)'
        },
    },
    listItemCol: {
        color: '#354052 !important',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    listBody: {
        overflowY: 'auto',
        maxHeight: 180,
    },
    width100: {
        width: '100%',
    },
    iconButton: {
        padding: 8,
        marginRight: 10
    }
};
