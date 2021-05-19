import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Divider,
  Paper,
  InputBase,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  makeStyles,
} from '@material-ui/core';
import {
  Search as SearchIcon,
  Close as CloseIcon,
  Menu as MenuIcon,

} from '@material-ui/icons';

import { isResidentsCommunity } from '../../../../constants/legalStatusTypes';
import { findOrganizations } from '../../../../actions/organizations';
import AssetsGrid from '../../../asset/AssetsGrid/AssetsGrid';
import OrganizationLogo from '../../../organization/OrganizationLogo';
import Tooltip from '../../../utils/TooltipWrapper';

import { validStatus } from '../../../../constants/statusTypes';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  paperMarginTop: {
    marginTop: theme.spacing(2),
  },
  listItem: {
    boxShadow: `inset 0 -1px 0 0 ${theme.palette.divider}`,
    '&:last-child': {
      boxShadow: 'none',
    }
  },
  logo: {
    maxWidth: theme.spacing(7),
    paddingRight: theme.spacing(2),

    '& > img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
}));

function OrganizationAssetsForm(props) {
  const {
    assetUUID,
    ownerUUID,
    publicOrganizationQuery,
    publicOrganization,
    onSelectAsset,
    handleSetData,
    organizations,
    organizationsSearch,
    requestOnly,
  } = props;
  const { t } = useTranslation('translations');
  const classes = useStyles();

  const totalCount = organizations.allOrganizationsNumber;
  const query = publicOrganizationQuery;
  const searchOrganizations = organizationsSearch;

  useEffect(() => {
    if (!totalCount) {
      searchOrganizations(query, { status: validStatus });
    }
  }, [searchOrganizations, totalCount, query]);

  if (publicOrganization) {
    return (
      <React.Fragment>
        <Paper className={classes.organizationsWrapper}>
          <OrganizationListItem
            ContainerComponent="div"
            organization={publicOrganization}
            className={classes.listItem}
            secondaryAction={
              <Tooltip title={t('assets.regBackToSearchResults')}>
                <IconButton
                  edge="end"
                  onClick={() => {
                    handleSetData({ publicOrganization: null, publicOrganizationQuery });
                    if (!requestOnly) {
                      onSelectAsset(null);
                    }
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            }
          />
        </Paper>
        <div className={classes.paperMarginTop}>
          <AssetsGrid
            filterParams={{ owner: publicOrganization.ID }}
            selectable={false}
            requestingOrgUUID={ownerUUID}
            value={assetUUID}
            onChange={onSelectAsset}
            requestOnly={requestOnly}
            claimResidencyButton={!requestOnly}
          />
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Paper
        component="form"
        className={classes.root}
        onSubmit={e => {
          e.preventDefault();
          if (publicOrganizationQuery) {
            organizationsSearch(publicOrganizationQuery, { status: validStatus });
          }
        }}
      >
        <IconButton className={classes.iconButton} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder={t('organizations.searchOrganizations')}
          onChange={e => handleSetData({ publicOrganizationQuery: e.target.value })}
          value={publicOrganizationQuery}
        />
        <IconButton
          className={classes.iconButton}
          onClick={() => {
            handleSetData({ publicOrganizationQuery: '' });
            organizationsSearch('', { status: validStatus });
          }}
          disabled={!publicOrganizationQuery}
        >
          <CloseIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton type="submit" color="primary" className={classes.iconButton}>
          <SearchIcon />
        </IconButton>
      </Paper>

      <Paper className={classes.paperMarginTop}>
        <List>
          {(organizations.allOrganizations || []).filter(o => !isResidentsCommunity(o.data.legal_form)).map(o => (
            <OrganizationListItem
              key={o._id}
              organization={o.data}
              className={classes.listItem}
              onClick={() => {
                handleSetData({ publicOrganization: o.data, publicOrganizationQuery });
              }}
            />
          ))}
        </List>
      </Paper>
    </React.Fragment>
  );
}

function OrganizationListItem(props) {
  const {
    organization,
    secondaryAction,
    ...listItemProps
  } = props;

  const classes = useStyles();

  return (
    <ListItem button {...listItemProps}>
      <ListItemIcon className={classes.logo}>
        <OrganizationLogo organization={organization} />
      </ListItemIcon>
      <ListItemText primary={organization.name} />
      {secondaryAction && (
        <ListItemSecondaryAction>
          {secondaryAction}
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
}

OrganizationAssetsForm.defaultProps = {
  publicOrganizationQuery: '',
};

export default connect(
  state => ({
    organizations: state.organization,
  }),
  dispatch => ({
    organizationsSearch: (query, params) => dispatch(findOrganizations(query, 0, 1000, params))
  }),
)(OrganizationAssetsForm);
