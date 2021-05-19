import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import { CountryFlag } from '../../utils/SVGflags';
import SearchAndFilter from '../../../containers/smartcomponents/SearchAndFilter';
import { parseAddress } from '../../asset/utils';

import styles from './styles';

const ProjectValidated = ({ classes, valid, t }) => {
  let className;
  let textInside;
  switch (valid) {
    case 1:
      className = classes.registeredStyle;
      textInside = t('translations:validStatus.planning');
      break;
    case 2:
      className = classes.pendingStyle;
      textInside = t('translations:validStatus.inProgress');
      break;
    case 3:
      className = classes.validStyle;
      textInside = t('translations:validStatus.finished');
      break;
    case 4:
      className = classes.declinedStyle;
      textInside = t('translations:validStatus.abandoned');
      break;
    default:
      break;
  }

  return (
    <div className={className} style={{ width: '82px' }}>
      {textInside}
    </div>
  );
};

const Validated = ({ classes, valid, t }) => {
  let className = {};
  let textInside = '';
  switch (valid) {
    case 1:
      className = classes.registeredStyle;
      textInside = t('translations:validStatus.registered');
      break;
    case 2:
      className = classes.validStyle;
      textInside = t('translations:validStatus.valid');
      break;
    case 3:
      className = classes.declinedStyle;
      textInside = t('translations:validStatus.declined');
      break;
    case 4:
      className = classes.pendingStyle;
      textInside = t('translations:validStatus.pending');
      break;
    default:
      break;
  }
  return (
    <div className={className}>
      {textInside}
    </div>
  );
};

function RenderStatus(props) {
  const { entityType, row, classes, t } = props;

  switch (entityType) {
    case 'project':
      return <ProjectValidated valid={row.data.status ? row.data.status : 3} classes={classes} t={t} />;
    case 'user':
      return (
        <div className={classes.userCountry}>
          {row.data.country}
          <CountryFlag country={row.data.country} />
        </div>
      );
    default:
      return <Validated valid={row.data.valid ? row.data.valid : 3} classes={classes} t={t} />;
  }
}

class AdminTable extends Component {
  render() {
    const {
      classes,
      entity,
      searchEntity,
      menuItems,
      type,
      getLinkProps,
      wrapperRenderer,
      itemRenderer,
      t,
    } = this.props;

    return (
      <div className={classes.root}>
        <SearchAndFilter
          searchAndFilter={searchEntity}
          menuItems={menuItems}
          isPublic={true}
          namespace={type}
        />
        <div className={classes.container}>
          {entity && entity.length > 0 ?
            entity.map((row, index) => {
              const linkProps = getLinkProps(row);

              let LinkComponent = Link;
              let className = null;
              if (linkProps.disabled) {
                LinkComponent = 'div';
                className = this.props.classes.rowDisabled;
              }

              return wrapperRenderer({ key: index, entity: row, children: (
                <LinkComponent
                  to={`/${type}/${row._id}`}
                  style={{ textDecoration: 'none' }}
                  className={className}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...linkProps}
                >
                  <div className={`row ${classes.rowStyle}`} key={row._id}>
                    <div className={`col-xs-9 ${classes.rowContentStyle}`}>
                      {itemRenderer(row)}
                      {type === 'asset' ? parseAddress(row.data.address) : row.data.name}
                    </div>
                    <div className={`col-xs-3 ${classes.headerStatusStyle}`}>
                      <RenderStatus row={row} classes={classes} entityType={type} t={t} />
                    </div>
                  </div>
                </LinkComponent>
              )});
            }) :
              <div className={classes.noResultsStyle}>There are no results found!</div>
          }
        </div>
      </div>
    );
  }
}

const noopRenderer = () => {};

AdminTable.propTypes = {
  itemRenderer: PropTypes.func,
  wrapperRenderer: PropTypes.func.isRequired,
  getLinkProps: PropTypes.func.isRequired,
};

AdminTable.defaultProps = {
  itemRenderer: noopRenderer,
  wrapperRenderer: (props) => <React.Fragment key={props.key} children={props.children} />,
  getLinkProps: () => ({}),
};

export default withStyles(styles)(withTranslation('translate')(AdminTable));
