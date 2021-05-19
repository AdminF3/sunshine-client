import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Typography,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    IconButton,
    Button,
    makeStyles
} from '@material-ui/core';
import {
    DeleteForever as RemoveIcon,
    Edit as EditIcon,
} from '@material-ui/icons';

import { stakeholderTypes } from '../../../constants/legalStatusTypes';
import Input from '../../utils/Input';

const useStyles = makeStyles({
    root: {
        // padding: 8,
    },
    marginBottom12: {
        marginBottom: 12,
    },
    actionButtons: {
        display: 'inline-flex',
    },
});

function MeetingGuestManager(props) {
    const {
        guestList,
        addGuest,
        editGuest,
        removeGuest,
    } = props;
    const classes = useStyles();
    const { t } = useTranslation('translations');

    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [editingParticipant, setEditingParticipant] = useState({ idx: -1, data: null });
    const isEditingParticipant = editingParticipant.idx > -1;

    const closeDialog = () => {
        if (isEditingParticipant) {
            setEditingParticipant({ idx: -1, data: null});
            return;
        }
        setAddDialogOpen(false);
    };

    return (
        <Grid
            container
            item
            xs={12}
            spacing={2}
            className={classes.root}
        >
            <Grid
                item
                xs={12}
            >
                <Typography variant="h6" color="textPrimary">
                    {t('meetings.listOfParticipants')}
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}
            >
                {guestList?.length > 0 ?
                    <TableContainer>
                        <Table className={classes.table} size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>{t('meetings.nameOfParticipant')}</TableCell>
                                    <TableCell align="right">{t('documents.type')}</TableCell>
                                    <TableCell align="right">{t('meetings.emailOfParticipant')}</TableCell>
                                    <TableCell align="right">{t('assets.organization')}</TableCell>
                                    <TableCell align="right">{t('organizations.phone')}</TableCell>
                                    <TableCell align="right">{t('documents.actions')}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {guestList?.map((row, i) => {
                                    const label = t(
                                        (stakeholderTypes.find(s => s.value === row.type) ||
                                        { labelKey: 'legalForms.UNKNOWN' }).labelKey
                                    );

                                    return (
                                        <TableRow key={i}>
                                            <TableCell component="th" scope="row">{row.name}</TableCell>
                                            <TableCell align="right">{label}</TableCell>
                                            <TableCell align="right">{row.email}</TableCell>
                                            <TableCell align="right">{row.organization}</TableCell>
                                            <TableCell align="right">{row.phone}</TableCell>
                                            <TableCell align="right">
                                                <span className={classes.actionButtons}>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => setEditingParticipant({ idx: i, data: { ...row } })}
                                                        color="primary"
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    {guestList?.length > 1 && (
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => removeGuest(i)}
                                                            color="default"
                                                        >
                                                            <RemoveIcon />
                                                        </IconButton>
                                                    )}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer> :
                    <Typography variant="subtitle1" align="center">
                        {t('meetings.noParticipants')}
                    </Typography>
                }
            </Grid>
            <Grid item xs={12}>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setAddDialogOpen(true)}
                >
                    {t('meetings.addParticipant')}
                </Button>
            </Grid>
            {(addDialogOpen || isEditingParticipant) && (
                <ParticipantDialog
                    title={t(`meetings.${isEditingParticipant ? 'edit' : 'add'}Participant`)}
                    participant={editingParticipant.data || undefined}
                    onClose={closeDialog}
                    onConfirm={(data) => {
                        if (isEditingParticipant) {
                            editGuest(editingParticipant.idx, data);
                        } else {
                            addGuest(data);
                        }
                        closeDialog();
                    }}
                />
            )}
        </Grid>
    );
}

function ParticipantDialog(props) {
    const {
        participant,
        title,
        onClose,
        onConfirm,
     } = props;

    const { t } = useTranslation('translations');
    const classes = useStyles();

    const [data, setData] = useState({ ...participant });

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            open
            onClose={onClose}
        >
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2} justify="space-between" className={classes.marginBottom12}>
                    <Grid item xs={4}>
                        <Input
                            required
                            label={t('meetings.nameOfParticipant')}
                            value={data.name}
                            onChange={e => setData({ ...data, name: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Input
                            label={t('meetings.emailOfParticipant')}
                            value={data.email}
                            onChange={e => setData({ ...data, email: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Input
                            label={t('meetings.phoneNumber')}
                            value={data.phone}
                            onChange={e => setData({ ...data, phone: e.target.value })}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} justify="space-between">
                    <Grid item xs={6}>
                        <Input
                            required
                            label={t('meetings.stakeholderType')}
                            value={data.type}
                            options={stakeholderTypes.map(o => ({ value: o.value, label: t(o.labelKey) }))}
                            onChange={e => setData({ ...data, type: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Input
                            label={t('assets.organization')}
                            value={data.organization}
                            onChange={e => setData({ ...data, organization: e.target.value })}
                        />
                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button
                    disableElevation
                    variant="contained"
                    onClick={onClose}
                    color="inherit"
                >
                    {t('utils.confirmDialogCancel')}
                </Button>
                <Button
                    variant="contained"
                    onClick={() => onConfirm(data)}
                    color="primary"
                    disabled={!data.name || !data.type}
                >
                    {t('navigation.ok')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

ParticipantDialog.defaultProps = {
    open: false,
    participant: {
        name: '',
        email: '',
        type: '',
        organization: '',
        phone: '',
    },
};

export default MeetingGuestManager;
