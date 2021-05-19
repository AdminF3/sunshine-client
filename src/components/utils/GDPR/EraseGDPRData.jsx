import React from 'react';
import { useTranslation } from 'react-i18next';

import {
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    Grid,
    Checkbox,
} from '@material-ui/core';

import Input from '../Input';
import GDPRUploads from './GDPRUploads';

function EraseGDPRData(props) {
    const { data, setData } = props;
    const { t } = useTranslation('privacy');

    return (
        <div>
            <h3>{t('appendix_5.h3_82')}</h3>
            <p>{t('appendix_5.p_83')}</p>
            <p>{t('appendix_5.p_84')}</p>
            <p>{t('appendix_5.p_85')}</p>
            <p>{t('appendix_5.p_86')}</p>
            <h3>{t('appendix_5.h3_87')}</h3>
            <p>{t('appendix_5.p_88')}</p>
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Input
                            label={t('appendix_5.ul_89_li_1')}
                            value={data.requesterName}
                            onChange={e => setData({ ...data, requesterName: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Input
                            label={t('appendix_5.ul_89_li_2')}
                            value={data.requesterAddress}
                            onChange={e => setData({ ...data, requesterAddress: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Input
                            label={t('appendix_5.ul_89_li_3')}
                            value={data.requesterPhone}
                            onChange={e => setData({ ...data, requesterPhone: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Input
                            label={t('appendix_5.ul_89_li_4')}
                            value={data.requesterEmail}
                            onChange={e => setData({ ...data, requesterEmail: e.target.value })}
                        />
                    </Grid>
                </Grid>
            </div>
            <h3>{t('appendix_5.h3_90')}</h3>
            <p>{t('appendix_5.p_91')}</p>
            <div>
                <FormControl>
                    <RadioGroup value={data.subject} onChange={e => setData({ ...data, subject: e.target.value })}>
                        <FormControlLabel value="self" control={<Radio />} label={t('appendix_5.p_92_code_1')} />
                        <FormControlLabel value="else" control={<Radio />} label={t('appendix_5.p_92_code_3')} />
                    </RadioGroup>
                </FormControl>
            </div>
            <p>{t('appendix_5.p_92')}</p>
            <ul><li>{t('appendix_5.ul_93_li_1')}</li><li>{t('appendix_5.ul_93_li_2')}</li></ul>
            <p>{t('appendix_5.p_94')}</p>
            <div>
                <GDPRUploads
                    onDropAccepted={fs => setData({ ...data, files: fs })}
                    files={data.files}
                />
            </div>
            <h3>{t('appendix_5.h3_95')}</h3>
            {
                data.subject === 'self' ?
                    <p>{t('appendix_5.p_300')}</p> :
                    <div>
                        <p>{t('appendix_5.ul_96_li_1')}</p>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Input
                                    label={t('appendix_5.ul_89_li_1')}
                                    value={data.name}
                                    onChange={e => setData({ ...data, name: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Input
                                    label={t('appendix_5.ul_89_li_2')}
                                    value={data.address}
                                    onChange={e => setData({ ...data, address: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Input
                                    label={t('appendix_5.ul_89_li_3')}
                                    value={data.phone}
                                    onChange={e => setData({ ...data, phone: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Input
                                    label={t('appendix_5.ul_89_li_4')}
                                    value={data.email}
                                    onChange={e => setData({ ...data, email: e.target.value })}
                                />
                            </Grid>
                        </Grid>
                    </div>
            }
            <h3>{t('appendix_5.h3_97')}</h3>
            <p>{t('appendix_5.p_98')}</p>
            <p>{t('appendix_5.p_99')}</p>
            <p>{t('appendix_5.p_100')}</p>
            <FormControl>
                <RadioGroup
                    value={data.reason?.toString()}
                    onChange={e => setData({ ...data, reason: parseInt(e.target.value, 10) })}
                >
                    <FormControlLabel value="1" control={<Radio />} label={t('appendix_5.p_101_code_1')} />
                    <FormControlLabel value="2" control={<Radio />} label={t('appendix_5.p_101_code_3')} />
                    <FormControlLabel value="3" control={<Radio />} label={t('appendix_5.p_101_code_5')} />
                    <FormControlLabel value="4" control={<Radio />} label={t('appendix_5.p_101_code_7')} />
                    <FormControlLabel value="5" control={<Radio />} label={t('appendix_5.p_101_code_9')} />
                    <FormControlLabel value="6" control={<Radio />} label={t('appendix_5.p_101_code_11')} />
                </RadioGroup>
            </FormControl>
            <h3>{t('appendix_5.h3_102')}</h3>
            <p>{t('appendix_5.p_103')}</p>
            <p>{t('appendix_5.p_104')}</p>
            <p>{t('appendix_5.p_105')}</p>
            <p>{t('appendix_5.p_106')}</p>
            <p>{t('appendix_5.p_107')}</p>
            <div>
                <Input
                    label={t('appendix_5.p_103')}
                    value={data.information}
                    onChange={e => setData({ ...data, information: e.target.value })}
                    multiline
                    rows={2}
                />
            </div>
            <h3>{t('appendix_5.h3_108')}</h3>
            <p>{t('appendix_5.p_109')}</p>
            <p>{t('appendix_5.p_112')}</p>
            <p>{t('appendix_5.p_113')}</p>
            <p>{t('appendix_5.p_114')}</p>
            <div>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={data.confirm}
                            onChange={() => setData({ ...data, confirm: !data.confirm })}
                        />
                    }
                    label={t('appendix_5.p_110')}
                />
            </div>
        </div>
    );
}

export default EraseGDPRData;
