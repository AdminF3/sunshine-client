import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { withTranslation } from 'react-i18next';

function PopUp (props) {
  const {
    t,
    termsofservice,
    size,
    label,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const actions = [
    <Button
      variant="contained"
      label="OK"
      primary
      onClick={handleClose}
    />,
  ];

  const createMarkup = () => termsofservice ? {__html: t('termsofuse:html')} : {__html: t('privacy:html')};

  return (
    <React.Fragment>
      <div
        style={{ fontSize: size && size}}
        className="secondary-redirect"
        onClick={handleOpen}
      >
        {!label ? termsofservice ? t('translations:auth.terms') : t('translations:auth.privacy') : label}
      </div>

      <Dialog
        actions={actions}
        modal="false"
        open={isOpen}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        maxWidth="md"
      >
        <DialogTitle>
          {termsofservice ? t('translations:auth.terms') : t('translations:auth.privacy')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText dangerouslySetInnerHTML={createMarkup()} />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="primary">
            {t('translations:navigation.ok')}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default withTranslation(['privacy', 'translations', 'termsofuse'])(PopUp);
