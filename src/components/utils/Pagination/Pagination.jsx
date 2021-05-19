import React from 'react';
import ReactJSPagination from 'react-js-pagination';
import { makeStyles } from '@material-ui/core';

import styles from './styles';

const useStyles = makeStyles(styles);

function Pagination(props) {
  const {
    activePage,
    itemsCountPerPage,
    totalItemsCount,
    pageRangeDisplayed,
    onChange,
  } = props;

  const classes = useStyles();

  return (
    <ReactJSPagination
      activePage={activePage}
      itemsCountPerPage={itemsCountPerPage}
      totalItemsCount={totalItemsCount}
      pageRangeDisplayed={pageRangeDisplayed}
      onChange={onChange}
      firstPageText='<<'
      prevPageText='<'
      nextPageText='>'
      lastPageText='>>'
      innerClass={classes.innerClass}
      itemClass={classes.itemClass}
      linkClass={classes.linkClass}
      activeClass={classes.activeClass}
      activeLinkClass= {classes.activeLinkClass}
      itemClassFirst={classes.itemClassFirst}
      itemClassLast={classes.itemClassLast}
    />
  );
}

Pagination.defaultProps = {
  pageRangeDisplayed: 5,
};

export default Pagination;
