
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles({
  content: {
    '& h2:first-child': {
      marginTop: 0,
    },
  },
});

function PrivacyPolicyDialog() {
  const { t } = useTranslation('privacy');
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <React.Fragment>
      <div
        className="secondary-redirect"
        onClick={toggleOpen}
      >
        {t('translations:auth.privacy')}
      </div>

      <Dialog
        fullWidth
        maxWidth="md"
        open={isOpen}
        onClose={toggleOpen}
        aria-labelledby={t('translations:auth.privacy')}
      >
        <DialogTitle>
          {t('translations:auth.privacy')}
        </DialogTitle>
        <DialogContent className={classes.content}>
          <h2>{t('appendix_3.title')}</h2>
          <p>{t('appendix_3.p_2')}</p>
          <p><strong>{t('appendix_3.p_3_strong_1')}</strong></p>
          <ul><li>{t('appendix_3.ul_4_li_1')}</li><li>{t('appendix_3.ul_4_li_2')}</li><li>{t('appendix_3.ul_4_li_3')}</li><li>{t('appendix_3.ul_4_li_4')}</li><li>{t('appendix_3.ul_4_li_5')}</li><li>{t('appendix_3.ul_4_li_6')}</li><li>{t('appendix_3.ul_4_li_7')}</li><li>{t('appendix_3.ul_4_li_8')}</li><li>{t('appendix_3.ul_4_li_9')}</li><li>{t('appendix_3.ul_4_li_10')}</li><li>{t('appendix_3.ul_4_li_11')}</li><li>{t('appendix_3.ul_4_li_12')}</li><li>{t('appendix_3.ul_4_li_13')}</li></ul>
          <p><strong>{t('appendix_3.p_5_strong_1')}</strong></p>
          <ul><li>{t('appendix_3.ul_6_li_1')}</li></ul>
          <p>{t('appendix_3.p_7')}</p>
          <p>{t('appendix_3.p_8')}</p>
          <ul><li>{t('appendix_3.ul_9_li_1')}</li><li>{t('appendix_3.ul_9_li_2')}</li><li>{t('appendix_3.ul_9_li_3')}</li></ul>
          <p>{t('appendix_3.p_10')}</p>
          <p><strong>{t('appendix_3.p_11_strong_1')}</strong></p>
          <p>{t('appendix_3.p_12')}</p>
          <ul><li>{t('appendix_3.ul_13_li_1')}</li><li>{t('appendix_3.ul_13_li_2')}</li><li>{t('appendix_3.ul_13_li_3')}</li></ul>
          <p>{t('appendix_3.p_14')}</p>
          <p>{t('appendix_3.p_15')}</p>
          <p>{t('appendix_3.p_16')}</p>
          <p>{t('appendix_3.p_17')}</p>
          <p>{t('appendix_3.p_18')}</p>
          <p>{t('appendix_3.p_19')}</p>
          <p>{t('appendix_3.p_20')}</p>
          <p><strong>{t('appendix_3.p_21_strong_1')}</strong></p>
          <ul>
            <li>{t('appendix_3.ul_22_li_1')}</li><li>{t('appendix_3.ul_22_li_2')}</li><li>{t('appendix_3.ul_22_li_3')}</li><li>{t('appendix_3.ul_22_li_4')}</li><li>{t('appendix_3.ul_22_li_5')}</li><li>{t('appendix_3.ul_22_li_6')}</li>
          </ul>
          <p>{t('appendix_3.p_23')}</p>

          <h2>{t('appendix_4.title')}</h2>
          <p><strong>{t('appendix_4.p_25_strong_1')}</strong></p>
          <p>{t('appendix_4.p_26')}</p>
          <p>{t('appendix_4.p_27')}</p>
          <p><strong>{t('appendix_4.p_28_strong_1')}</strong></p>
          <ul>
            <li>{t('appendix_4.p_29_code_1')}</li>
            <li>{t('appendix_4.p_29_code_3')}</li>
          </ul>
          <p>{t('appendix_4.p_29')}</p>
          <p>{t('appendix_4.p_30')}</p>
          <p><strong>{t('appendix_4.p_31_strong_1')}</strong></p>
          <p>{t('appendix_4.p_32')}</p>
          <p><strong>{t('appendix_4.p_33_strong_1')}</strong></p>
          <p>{t('appendix_4.p_34')}</p>
          <p><strong>{t('appendix_4.p_35_strong_1')}</strong></p>
          <p>{t('appendix_4.p_36')}</p>
          <p><strong>{t('appendix_4.p_37_strong_1')}</strong></p>
          <p>{t('appendix_4.p_38')}</p>

          <h2>{t('appendix_5.title')}</h2>

            <p>{t('appendix_5.p_40')}</p>
            <p>{t('appendix_5.p_41')}</p>
            <p>{t('appendix_5.p_42')}</p>
            <p>{t('appendix_5.p_43')}</p>
            <p>{t('appendix_5.p_44')}</p>
            <h3>{t('appendix_5.h3_45')}</h3>
            <p><strong>{t('appendix_5.p_46_strong_1')}</strong></p>
            <p>{t('appendix_5.p_47')}</p>
            <ul>
              <li>{t('appendix_5.ul_48_li_1')}</li>
              <li>{t('appendix_5.ul_48_li_2')}</li>
              <li>{t('appendix_5.ul_48_li_3')}</li>
              <li>{t('appendix_5.ul_48_li_4')}</li>
              <li>{t('appendix_5.ul_48_li_5')}</li>
              <li>{t('appendix_5.ul_48_li_6')}</li>
              <li><p>{t('appendix_5.ul_48_li_7_p_1')}</p></li>
              <li><p>{t('appendix_5.ul_48_li_8_p_1')}</p></li>
              <li>{t('appendix_5.ul_48_li_9')}</li>
              <li>{t('appendix_5.ul_48_li_10')}</li>
              <li>{t('appendix_5.ul_48_li_11')}</li>
              <li><strong>{t('appendix_5.ul_48_li_11_strong_2')}</strong></li>
            </ul>
            <p>{t('appendix_5.p_49')}</p>
            <p><strong>{t('appendix_5.p_50_strong_1')}</strong></p>
            <p>{t('appendix_5.p_51')}</p>
            <p><strong>{t('appendix_5.p_52_strong_1')}</strong></p>
            <p>{t('appendix_5.p_53')}</p>
            <p>{t('appendix_5.p_54')}</p>
            <p><strong>{t('appendix_5.p_55_strong_1')}</strong></p>
            <p>{t('appendix_5.p_56')}</p>
            <p><strong>{t('appendix_5.p_57_strong_1')}</strong></p>
            <p>{t('appendix_5.p_58')}</p>
            <p>{t('appendix_5.p_59')}</p>
            <p><strong>{t('appendix_5.p_60_strong_1')}</strong></p>
            <p>{t('appendix_5.p_61')}</p>
            <p>{t('appendix_5.p_62')}</p>
            <p><strong>{t('appendix_5.p_63_strong_1')}</strong></p>
            <p>{t('appendix_5.p_64')}</p>
            <p><strong>{t('appendix_5.p_65_strong_1')}</strong></p>
            <p>{t('appendix_5.p_66')}</p>
            <p>{t('appendix_5.p_67')}</p>
            <p><strong>{t('appendix_5.p_68_strong_1')}</strong></p>
            <p>{t('appendix_5.p_69')}</p>
            <p>{t('appendix_5.p_70')}</p>
            <p><strong>{t('appendix_5.p_71_strong_1')}</strong></p>
            <p>{t('appendix_5.p_72')}</p>
            <p><strong>{t('appendix_5.p_73_strong_1')}</strong></p>
            <p>{t('appendix_5.p_74')}</p>
            <ul><li>{t('appendix_5.ul_75_li_1')}</li><li>{t('appendix_5.ul_75_li_2')}</li></ul>
            <p><strong>{t('appendix_5.p_76_strong_1')}</strong>{t('appendix_5.p_76')}</p>
            <p><strong>{t('appendix_5.p_77_strong_1')}</strong></p>
            <p>{t('appendix_5.p_78')}</p>
            <p>{t('appendix_5.p_79')}</p>
            <p>{t('appendix_5.p_80')}</p>
            <p><code>{t('appendix_5.p_81_code_1')}</code></p>
            <p><code>{t('appendix_5.p_81_code_3')}</code></p>
            <p><code>{t('appendix_5.p_81_code_5')}</code></p>
            <p><code>{t('appendix_5.p_81_code_7')}</code></p>
            <p><code>{t('appendix_5.p_81_code_9')}</code></p>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={toggleOpen}
            color="primary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default PrivacyPolicyDialog;
