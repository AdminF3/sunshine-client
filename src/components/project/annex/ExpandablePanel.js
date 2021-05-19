import React from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Divider,
  SvgIcon,
  withStyles
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

global.__MUI_SvgIcon__ = SvgIcon;

const styles = theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '1.58',
    textAlign: 'left',
    color: '#7f8fa4'
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.3%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.text.lightDivider}`,
    padding: `${theme.spacing()}px ${theme.spacing(2)}px`,
  },
  link: {
    color: theme.palette.primary[500],
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

const DetailedAccordion = ({classes, label, data, expanded, onChange}) => {
  return (
    <div className={classes.root}>
      <Accordion
        expanded={expanded}
        onChange={onChange}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{label}</Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails
          className={classes.details}
          style={{backgroundColor: '#fafbfc ', border: 'solid 1px #dfe2e5 '}}
        >
            { data ? data : '' }
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

DetailedAccordion.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DetailedAccordion);
