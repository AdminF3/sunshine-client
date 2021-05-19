import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import {
    Table,
    TableBody,
    TableRow,
    TableHead,
    TableContainer,
    TableCell,
    Paper,
    makeStyles
} from '@material-ui/core';

import { SERVER } from '../../../constants/endpoints';
import UploadFile from '../../../containers/smartcomponents/UploadFile/UploadFile';
import { refetchSingleProject } from '../../../actions/projects';
import { canEditProject } from '../../../utils/can';
import Disclaimer from './Disclaimer';

const useStyles = makeStyles({
    container: {
        padding: '0px 30px'
    },
    table: {
        maxHeight: 680
    },
    uploadContainer: {
        float: 'right',
        marginBottom: 30
    }
});

function ContractHistory(props) {
    const { project, user, refetch } = props;
    const { t } = useTranslation('translations');
    const classes = useStyles();

    const signedEPC = Object.values(project._attachments || {}).filter(
        f => f.upload_type === 'signed epc').sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt),
    );
    const files = Object.values(project._attachments || {}).filter(
        f => f.upload_type === 'epc contracts').sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt),
    );

    return (
        <div className={classes.container}>
            {canEditProject(project, user) ?
                <div className={classes.uploadContainer}>
                    <UploadFile
                        entity={{
                            id: project._id,
                            type: 'project',
                            uploadType: 'epc contracts'
                        }}
                        buttonOnly
                        canUpload
                        onSuccess={() => refetch(project._id)}
                    />
                </div> :
                null
            }
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {signedEPC.length === 0 && files.length === 0 ?
                                <TableCell align="center">{t('documents.noContractsUploaded')}</TableCell> :
                                <React.Fragment>
                                    <TableCell>{t('documents.name')}</TableCell>
                                    <TableCell align="right">{t('documents.uploadedAt')}</TableCell>
                                </React.Fragment>
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {signedEPC.map((f) => <RenderRow key={f.ID} file={f} />)}
                        {files.map((f) => <RenderRow key={f.ID} file={f} />)}
                    </TableBody>
                </Table>
            </TableContainer>
            <Disclaimer />
        </div>
    );
}

function RenderRow(props) {
    const { file } = props;

    return (
        <TableRow key={file.ID}>
            <TableCell component="th" scope="row">
                <a target="_blank" rel="noopener noreferrer" href={`${SERVER}/project/${file.Owner}/${file.name}`}>
                    {file.name}
                </a>
            </TableCell>
            <TableCell align="right">{moment(file.CreatedAt).format('DD-MM-YYYY')}</TableCell>
        </TableRow>
    );
}

export default connect(
    state => ({
        project: state.project.refetchProject,
        user: state.user
    }),
    dispatch => ({
        refetch: (projectID) => dispatch(refetchSingleProject(projectID)),
    })
)(ContractHistory);
