import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Tabs,
    Tab,
    makeStyles,
} from '@material-ui/core';
import {
    Info as InfoIcon,
} from '@material-ui/icons';

import ProgressBar from '../../utils/ProgressBar';
import UserTooltip from '../../utils/UserTooltip';
import MarkdownText from '../../utils/MarkdownText';
import styles from './styles';

const useStyles = makeStyles(styles);

function InnerTabs(props) {
    const {
        content,
        innerIndex,
        projectId,
        fetchingProj,
        onChange,
    } = props;

    const { t } = useTranslation('translations');
    const classes = useStyles();

    return (
        <React.Fragment>
            <div
                className={classes.subHeader}
            >
                <Tabs
                    value={innerIndex}
                    onChange={onChange}
                >
                    {
                        content.map((el, index) => (
                            <Tab
                                label={el.labelKey ? t(el.labelKey) : el.label}
                                key={index}
                                className={classes.tabLabelStyle}
                                onClick={() =>
                                    window.history.pushState('', '', `/project/${projectId}/${el.urlEnding}`
                                )}
                            />
                        ))
                    }
                </Tabs>
            </div>
            {
                fetchingProj ?
                <ProgressBar /> :
                content.map((element, index) => {
                    if (!element?.component || innerIndex !== index) {
                        return null;
                    }

                    return (
                        <div className={classes.root} key={index}>
                            {element.tooltip && (
                                <UserTooltip
                                    action="click"
                                    icon={<InfoIcon />}
                                    title={
                                        <MarkdownText
                                            text={t(element.tooltip, { returnObjects: true })}
                                        />
                                    }
                                    className={classes.pageTooltip}
                                />
                            )}
                            {<element.component {...element.componentProps} />}
                        </div>
                    );
                })
            }
        </React.Fragment>
    );
}

export default InnerTabs;
