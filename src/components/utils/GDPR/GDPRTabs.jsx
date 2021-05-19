import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import {
    Tabs,
    Tab,
    Box,
    AppBar,
    makeStyles
} from '@material-ui/core';

import ExtractGDPRData from './ExtractGDPRData';
import EraseGDPRData from './EraseGDPRData';

const useStyles = makeStyles({
    appBar: {
        position: 'absolute',
        margin: '-50px 0px'
    },
    tabPanel: {
        marginTop: -15
    }
});

function GDPRTabs(props) {
    const { setData, data, gdprDefaultData } = props;
    const [value, setValue] = React.useState(0);
    const classes = useStyles();
    const { t } = useTranslation('privacy');
    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
            <AppBar position="static" className={classes.appBar}>
                <Tabs value={value} onChange={handleChange} >
                    <Tab
                        label={t('appendix_5.p_301')}
                        onClick={() => setData({
                            ...gdprDefaultData, action: 'GET'
                        })}
                    />
                    <Tab
                        label={t('appendix_5.p_302')}
                        onClick={() => setData({
                            ...gdprDefaultData, action: 'DELETE'
                        })}
                    />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} className={classes.tabPanel}>
                <ExtractGDPRData
                    data={data}
                    setData={setData}
                />
            </TabPanel>
            <TabPanel value={value} index={1} className={classes.tabPanel}>
                <EraseGDPRData
                    data={data}
                    setData={setData}
                />
            </TabPanel>
        </React.Fragment>
    );
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default GDPRTabs;