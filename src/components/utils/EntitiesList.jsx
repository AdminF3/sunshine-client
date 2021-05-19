import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import {
    Divider,
    Grid,
    Avatar,
    Typography,
    ListItem,
    ListItemText,
    ListItemIcon,
    Collapse,
    Table,
    TableContainer,
    TableBody,
    TableRow,
    TableCell,
    makeStyles,
} from '@material-ui/core';

import {
    ExpandMore,
    ExpandLess,
    InfoOutlined as InfoIcon,
} from '@material-ui/icons';

import UserTooltip from '../utils/UserTooltip';
import MarkdownText from '../utils/MarkdownText';
import { assetImages } from '../../constants/assetTypes';
import {
    retrieveOrganizationRoles as getOrganizationRoles,
    retrieveProjectRoles as getProjectRoles,
} from '../../utils/userRoles';
import { parseAddress } from '../asset/utils';
import { getLogoURL } from '../organization/OrganizationLogo';

const styles = theme => ({
    entitiesRoot: {
        marginTop: 20,
        backgroundColor: '#FFFFFF',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 4,
    },
    title: {
        padding: 20,

        '& .MuiListItemText-root': {
            margin: 0,

            '& > .MuiTypography-root': {
                color: '#354052',
                lineHeight: '22px',
                fontSize: 17,
            },
        },
        '& .MuiSvgIcon-root': {
            fontSize: 22,
        },
    },
    disablePadding: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    divider: {
        width: '100%',
    },
    tableContainer: {
        maxHeight: 210,
    },
    link: {
        textDecoration: 'none',
        color: '#000000',
        '&:hover': {
            color: theme.palette.primary.light,
        }
    },
    roleBadge: {
        marginLeft: 20
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
});

const useStyles = makeStyles(styles);

function EntitiesList(props) {
    const classes = useStyles();
    const { t } = useTranslation('translations');
    const {
        userId,
        entities,
        label,
        tooltip,
        type,
        withDivider,
        zeroEntriesMessage,
        disablePadding,
    } = props;
    const [openList, setopenList] = useState(true);

    const handleClick = () => {
        setopenList(!openList);
    };

    function avatar(el) {
        if (type === 'organization') {
            return getLogoURL(el?.data);
        }
        return assetImages[el?.data?.building_type || el?.data?.asset?.data?.building_type || el?.asset_snapshot?.building_type];
    }

    return (
        <Grid
            container
            className={classes.entitiesRoot}
        >
            <Grid
                item
                xs={12}
                onClick={handleClick}
                component={ListItem}
                button
                className={clsx(classes.title, { [classes.disablePadding]: disablePadding && tooltip })}
            >
                {tooltip && (
                    <ListItemIcon>
                        <UserTooltip
                            action="click"
                            icon={<InfoIcon />}
                            title={
                                <MarkdownText
                                    text={t(tooltip, { returnObjects: true })}
                                />
                            }
                        />
                    </ListItemIcon>
                )}
                <ListItemText
                    primary={label}
                />
                {openList ? <ExpandLess /> : <ExpandMore />}
            </Grid>
            {withDivider && <Divider className={classes.divider} />}
            <Grid
                item
                xs={12}
            >
                <Collapse
                    in={openList}
                    timeout="auto"
                    unmountOnExit
                >
                    <TableContainer
                        className={classes.tableContainer}
                    >
                        <Table>
                            <TableBody>
                                {entities.length > 0 ? entities.map((row, index) => {
                                    let roles = null;
                                    if (userId) {
                                        if (type === 'project') {
                                            roles = getProjectRoles(userId, row);
                                        } else if (type === 'organization') {
                                            roles = getOrganizationRoles(userId, row);
                                        }
                                    }

                                    return (
                                        <TableRow
                                            key={index}
                                            className={classes.link}
                                        >
                                            <TableCell>
                                                <Avatar
                                                    alt={row?.data?.name || row?.name}
                                                    src={avatar(row)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Link
                                                    to={`/${type}/${row?._id}`}
                                                    className={classes.link}
                                                    color="primary"
                                                >
                                                    {type === 'asset' ? parseAddress(row?.data?.address) : row?.data?.name || row?.name}
                                                </Link>
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                            >
                                                {roles && roles.filter(r => r !== 'unsigned').map((r, i) => (
                                                    <Typography key={i} className={classes.role}>
                                                        {type === 'organization' ? t(`organizations.${r}`) : t(`projects.${r}`)}
                                                    </Typography>
                                                ))}
                                            </TableCell>
                                        </TableRow>
                                    );
                                }) :
                                    <TableRow>
                                        <TableCell>
                                            {zeroEntriesMessage}
                                        </TableCell>
                                    </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Collapse>
            </Grid>
        </Grid>
    );
}

EntitiesList.propTypes = {
    withDivider: PropTypes.bool,
    disablePadding: PropTypes.bool,
};

EntitiesList.defaultProps = {
    withDivider: true,
    disablePadding: false,
};

export default EntitiesList;
