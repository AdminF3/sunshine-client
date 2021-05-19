import { SELECT_LANGUAGE_REQUEST, SELECT_LANGUAGE_SUCCESS, SELECT_LANGUAGE_FAILURE } from '../constants/actionTypes';
import i18next from 'i18next';

function requestLangauge(){
  return {
    type: SELECT_LANGUAGE_REQUEST
  }
}
function langSuccess(lang){
  return {
    type: SELECT_LANGUAGE_SUCCESS,
    language: lang
  }
}
function langError(){
  return {
    type: SELECT_LANGUAGE_FAILURE
  }
}

export function errorMSGreset(formName){
  if(formName){
    return {
      type: '@@redux-form/CHANGE',
      meta: {
        form: formName
      },
      payload: Math.random().toString(36).substring(2, 5)
    }
  } else {
    return {
      type: '@@redux-form/CHANGE'
    }
  }
}

export default function toggleLanguage(lang, formName){
  return (dispatch) => {
    dispatch(requestLangauge());

    i18next.changeLanguage(lang, (err, t) => {
      if (err) dispatch(langError());
      dispatch(langSuccess(lang));
      if(formName){
        dispatch(errorMSGreset(formName));
      }
    });
  }
}
