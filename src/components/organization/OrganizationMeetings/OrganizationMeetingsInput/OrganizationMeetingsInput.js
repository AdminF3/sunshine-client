import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

class OrganizationMeetingsInput extends Component {
    render() {
        const { classes, onChange, label, name, refs, errors, value } = this.props;

        return (
            <>
                <div className={classes.label}>
                    {label}
                </div>
                <input
                    value={value && value}
                    name={name}
                    className={classes.input}
                    ref={refs}
                    onChange={element => onChange(name, element.target.value)}
                />
                {
                    errors &&
                    <div className={classes.error}>
                        {errors[name]}
                    </div>
                }
            </>
        )
    }
}

export default withStyles(styles)(OrganizationMeetingsInput);
