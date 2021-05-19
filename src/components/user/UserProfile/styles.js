export default theme => ({
    container: {
        margin: 20,
        width: 'auto',
        [theme.breakpoints.down('sm')]: {
            margin: 10,
        },
        [theme.breakpoints.down('xs')]: {
            margin: 5,
        },
    },
    userInformationContainer: {
        backgroundColor: '#FFFFFF',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 4,
        paddingBottom: 40,
    },
    verificationContainer: {
        backgroundColor: '#FFFFFF',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 4,
        padding: 0
    },
    avatarContainer: {
        paddingTop: 20,
        position: 'relative',
    },
    avatar: {
        width: '10rem',
        height: '10rem',
        margin: 'auto',
    },
    labelContainer: {
        marginBottom: 20,
        width: '100%',
        textAlign: 'left',
    },
    label: {
        color: '#7F8FA4',
        fontSize: '0.8rem',
        fontWeight: 600,
        width: '11rem',
        margin: 'auto',
    },
    text: {
        width: '11rem',
        margin: 'auto',
        fontSize: '1rem',
    },
    profileDivider: {
        margin: 40,
    },
    statusDivider: {
        margin: '20px 40px',
    },
    orglistDivider: {
        marginRight: 35
    },
    verified: {
        color: 'gold',
        width: 30,
        height: 30,
        marginLeft: 20
    },
    notVerified: {
        color: 'silver',
        width: 30,
        height: 30,
        marginLeft: 20
    },
    editButton: {
        position: 'absolute',
        padding: 0,
        float: 'right',
        width: 40,
        height: 40,
        borderRadius: '50%',
        border: '1px solid #DFE2E5',
        backgroundColor: '#FFFFFF',
        marginTop: 6,
        right: -20,
        top: -25,
    },
    textFieldItem: {
        textAlign: 'center',
        width: '11rem',
        margin: 'auto',
    },
    platformStatusLabel: {
        fontSize: '1.1rem',
        paddingLeft: 20,
    },
    statusHeader: {
        position: 'relative',
        marginTop: 20,
        alignItems: 'center',
    },
    filesContainer: {
        borderRight: '1px',
        width: '100%',
    },
    documentsList: {
        width: '100%',
        overflowY: 'auto'
    },
    organizationsListContainer: {
        marginBottom: 10,
        borderLeft: `1px solid ${theme.palette.divider}`
    },
    organizationsListTitle: {
        marginLeft: 15,
        marginBottom: 15,
    },
    organizationsList: {
        height: '14rem',
        overflowY: 'auto',
    },
    closeButton: {
        left: 40,
        position: 'absolute',
    },
    saveButton: {
        right: 40,
        position: 'absolute',
    },
    buttonsFooter: {
        height: 30,
        position: 'relative',
        marginTop: 30,
    },
    documentName: {
        marginLeft: '10px',
        overflowWrap: 'break-word',
        marginRight: '10',
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: '0.00938em',
        color: 'black',
        textDecoration: 'none',
        '&:hover': {
            cursor: 'pointer',
            color: theme.palette.primary.light
        },
    },
    deleteIconContainer: {
        position: 'absolute',
        right: '0',
    },
    deleteIcon: {
        height: '1.2em',
        width: '1.2em',
        '&:hover': {
            cursor: 'pointer',
            color: theme.palette.error.dark,
        },
    },
    role: {
        float: 'right',
        margin: 10,
        textTransform: 'uppercase',
        padding: '0px 4px',
        color: '#FFFFFF',
        fontSize: '0.8rem',
        borderRadius: 5,
        backgroundColor: theme.palette.primary.dark,
    },
    orgListRow: {
        flexWrap: 'nowrap'
    },
    link: {
        textDecoration: 'none',
        color: '#000000',
        '&:hover': {
            color: theme.palette.primary.light,
        }
    },
    verifyIcon: {
        color: theme.palette.secondary.main
    },
    declineIcon: {
        color: theme.palette.error.dark
    },
    verifiedIconContainer: {
        alignSelf: 'center'
    },
    uploadContainer: {
        textAlign: 'center',
    },
    uploadButton: {
        margin: 10,
        padding: '6px 15px',
    },
    roleBadge: {
        marginLeft: 20
    },
    platformActions: {
        display: 'flex',
        position: 'absolute',
        right: 20
    },
    entitiesRoot: {
        marginTop: 20,
        backgroundColor: '#FFFFFF',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 4,
    },
    tableContainer: {
        maxHeight: 210,
    },
});
