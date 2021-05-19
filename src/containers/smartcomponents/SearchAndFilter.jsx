import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Grid,
  IconButton,
  InputBase,
  makeStyles,
} from '@material-ui/core';
import {
  Clear as ClearIcon,
  Info as InfoIcon,
  InfoOutlined as SearchInfoIcon,
  Search as SearchIcon,
} from '@material-ui/icons';

import Input from '../../components/utils/Input';
import UserTooltip from '../../components/utils/UserTooltip';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: '10px 30px',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    zIndex: 1,
    display: 'flezx',

    '&:after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 2,
      backgroundColor: '#DFE2E5',
    },
    '& .MuiFormControl-fullWidth': {
      '& .MuiSelect-root': {
        paddingTop: 10,
        paddingBottom: 10,
      },
    },
  },
  searchButtonRoot: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: 4,

    '&:hover': {
      borderColor: 'rgba(0, 0, 0, 0.87)',
    },
  },
  searchButtonInput: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  searchButtonIconButton: {
    padding: 2,
  },
  searchButtonDivider: {
    height: 20,
    margin: 2,
  },
}));

const defaultState = {
  filter: '',
  search: '',
  searchInput: '',
  initialized: false,
  performed: false,
};

function SearchAndFilter(props) {
  const {
    searchAndFilter,
    menuItems,
    isPublic,
    userID,
    queryParam,
    offset,
    limit,
    namespace,
    tooltip,
    searchInfoTooltip,
  } = props;

  const classes = useStyles();

  const [ns, setNS] = useState(namespace);
  const [publicState, setPublicState] = useState({ [ns]: { ...defaultState } });
  const [privateState, setPrivateState] = useState({ [ns]: { ...defaultState } });

  const stateRoot = isPublic ? publicState : privateState;
  const state = stateRoot[ns];
  const setStateRoot = isPublic ? setPublicState : setPrivateState;

  const setState = (newState) => {
    return setStateRoot({
      ...stateRoot,
      [ns]: {
        ...stateRoot[ns],
        ...newState,
      },
    });
  };

  if (ns !== namespace) {
    if (!stateRoot[namespace]) {
      setStateRoot({
        ...stateRoot,
        [ns]: { ...stateRoot[ns], performed: true },
        [namespace]: { ...defaultState },
      });
    }
    setNS(namespace);
  }

  const { filter, search, searchInput, initialized, performed } = state;

  const performSearch = useCallback(() => {
    if (isPublic) {
      searchAndFilter(search, filter);
    } else {
      searchAndFilter(userID, { search, [queryParam]: filter, offset, limit });
    }
  }, [
    isPublic,
    userID,
    search,
    filter,
    queryParam,
    offset,
    limit,
    searchAndFilter,
  ]);

  useEffect(() => {
    if (!initialized) {
      return;
    }
    if (performed) {
      return;
    }
    performSearch();
  }, [initialized, performed, performSearch]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item md={3} xs={4}>
          <Input
            options={menuItems}
            value={filter}
            onChange={e => {
              setState({
                ...state,
                filter: e.target.value,
                initialized: true,
                performed: false,
              });
            }}
          />
        </Grid>
        <Grid item md={3} xs={4}>
          <Box
            component="form"
            className={classes.searchButtonRoot}
            onSubmit={e => {
              e.preventDefault();
              setState({
                ...state,
                search: searchInput,
                initialized: true,
                performed: false,
              });
            }}
          >
            <InputBase
              className={classes.searchButtonInput}
              inputProps={{
                value: searchInput,
                onChange: (e) => setState({ ...state, search: '', searchInput: e.target.value }),
              }}
            />
            <IconButton
              color="primary"
              type="submit"
              className={classes.searchButtonIconButton}
            >
              <SearchIcon />
            </IconButton>
            <Divider className={classes.searchButtonDivider} orientation="vertical" />
            <ClearButton
              tooltip={searchInfoTooltip}
              withTooltip={!searchInput && !filter}
              onClear={() => {
                setState({
                  ...defaultState,
                  initialized: true,
                });
              }}
            />
          </Box>
        </Grid>
        {tooltip && (
          <Grid item md={6} xs={4} align="right">
            <UserTooltip
              action="click"
              icon={<InfoIcon />}
              title={tooltip}
            />
          </Grid>
        )}
      </Grid>
    </div>
  );
}

function ClearButton(props) {
  const {
    tooltip,
    withTooltip,
    onClear,
  } = props;

  const classes = useStyles();

  if (withTooltip && tooltip) {
    return (
      <UserTooltip
        action="click"
        icon={<SearchInfoIcon />}
        iconButtonProps={{ color: 'default', size: 'small' }}
        title={tooltip}
      />
    );
  }

  return (
    <IconButton
      className={classes.searchButtonIconButton}
      onClick={onClear}
    >
      <ClearIcon />
    </IconButton>
  );
}

SearchAndFilter.propTypes = {
  // namespace is the namespace for this SearchAndFilter component.
  // Eg. user, organization, asset, etc.
  // If namespace prop changes, the component might still be mounted,
  // therefore needs to know when to clear its state.
  namespace: PropTypes.string.isRequired,
  tooltip: PropTypes.node,
  searchInfoTooltip: PropTypes.node,
};

SearchAndFilter.defaultProps = {
  namespace: 'default',
};

export default SearchAndFilter;
