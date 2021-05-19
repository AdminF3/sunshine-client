import i18n from 'i18next';

import ENDPOINTS from '../constants/endpoints';
import { addAlert } from './alerts';

export function uploadFile(file, entity, settings) {
  const { id, type, kind, uploadType, comment } = entity;
  const { onSuccess, successMessageKey, withoutAlert } = settings;

  const formData = new FormData();
  formData.append('file', file);
  if (kind) {
    formData.append('kind', kind);
  }
  if (uploadType) {
    formData.append('upload-type', uploadType);
  }
  if (comment) {
    formData.append('comment', comment);
  }

  return (dispatch) => {
    dispatch({ type: 'UPLOAD_DOCUMENT#START' });

    return fetch(`${ENDPOINTS.SERVER}/${type}/${id}/upload`, {
      method: 'POST',
      credentials: 'include',
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }
        dispatch({ type: 'UPLOAD_DOCUMENT#SUCCESS' });
        if (!withoutAlert) {
          dispatch(addAlert({
            text: i18n.t(successMessageKey || 'translations:documents.uploadSuccess'),
            level: 'success',
          }));
        }
        return onSuccess && onSuccess();
      })
      .catch(err => {
        dispatch({ type: 'UPLOAD_DOCUMENT#ERROR' });
        if (err && err.message === 'Failed to fetch') {
          dispatch(addAlert({ text: i18n.t('translations:documents.genericError'), level: 'error' }));
        } else {
          dispatch(addAlert({ text: i18n.t('translations:documents.uploadError'), level: 'error' }));
        }
      });
  };
}

export function deleteFile(fileName, entity, settings) {
  const { id, type } = entity;
  const { onSuccess } = settings;

  return (dispatch) => {
    dispatch({ type: 'DELETE_DOCUMENT#START' });
    return fetch(`${ENDPOINTS.SERVER}/${type}/${id}/${fileName}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }
        dispatch({ type: 'DELETE_DOCUMENT#SUCCESS' });
        dispatch(addAlert({text: i18n.t('translations:documents.deleteSuccess'), level: 'success'}));
        return onSuccess && onSuccess();
      })
      .catch(err => {
        dispatch({ type: 'DELETE_DOCUMENT#ERROR', error: err });
        dispatch(addAlert({ text: i18n.t('translations:documents.deleteError'), level: 'error' }));
      });
  };
}

export function uploadAndDeleteFiles(filesByType, entity) {
  const { toDelete, toAdd } = filesByType;
  const { ID, type, kind, uploadType, comment } = entity;

  return () => {
    if (!ID || !type) {
      return Promise.reject(new Error('No entity provided!'));
    }
    if (toDelete?.length < 1 && toAdd?.length < 1) {
      return Promise.resolve('nothing to do');
    }

    return Promise.all(
      [toDelete, toAdd].map((files, i) => {
        const method = i === 0 ? 'DELETE' : 'POST';
        const url = `${ENDPOINTS.SERVER}/${type}/${ID}`;
        return Promise.all(files.map((file) => {
          let endpoint = file.name;
          let body;
          if (i === 1) {
            endpoint = 'upload';

            const formData = new FormData();
            formData.append('file', file);
            if (kind) {
              formData.append('kind', kind);
            }
            if (uploadType) {
              formData.append('upload-type', uploadType);
            }
            if (comment) {
              formData.append('comment', comment);
            }
            body = formData;
          }
          return fetch(`${url}/${endpoint}`, { method, credentials: 'include', body });
        }));
      })
    );
  };
}
